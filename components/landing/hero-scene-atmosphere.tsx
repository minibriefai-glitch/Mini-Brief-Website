"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * WebGL atmosphere layer for the hero. Renders *behind* the live product
 * panel and never receives pointer events — the panel itself stays real,
 * interactive DOM, so the demo remains clickable.
 *
 * Everything here is depth and mood only: drifting brand-tinted orbs plus a
 * soft accent wash that reads as a rim light catching the panel edge.
 *
 * Perf contract:
 * - dpr capped at 2; parent drops frameloop to "demand" when off-screen or
 *   when the user prefers reduced motion, which parks the rAF loop while
 *   leaving the last frame on the canvas.
 * - Pointer parallax is read from a ref and lerped inside useFrame, so
 *   mouse movement never triggers a React render.
 */

/** Brand palette — mirrors --accent and the violet stop of --grad. */
const BLUE = new THREE.Color("#4a62f5");
const VIOLET = new THREE.Color("#7b5cff");
const ORB_COUNT = 34;

export type Pointer = { x: number; y: number };

/** Seeded so the orb field is identical on every mount. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Soft radial sprite — a glow with no hard edge, so orbs read as light. */
function makeOrbTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.22, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Orbs({ pointer }: { pointer: RefObject<Pointer> }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material, seeds } = useMemo(() => {
    const rand = mulberry32(0x5eed);
    const positions = new Float32Array(ORB_COUNT * 3);
    const colors = new Float32Array(ORB_COUNT * 3);
    const sizes = new Float32Array(ORB_COUNT);
    const seeds: { phase: number; speed: number; amp: number; baseY: number }[] = [];
    const c = new THREE.Color();

    for (let i = 0; i < ORB_COUNT; i++) {
      // Bias orbs toward the edges — the centre sits behind the panel anyway.
      const edge = rand() < 0.72;
      const x = edge
        ? (rand() < 0.5 ? -1 : 1) * (2.6 + rand() * 3.6)
        : (rand() - 0.5) * 5;
      const y = (rand() - 0.5) * 7;
      const z = -4 + rand() * 5.2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      c.copy(BLUE).lerp(VIOLET, rand() * 0.85);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.05 + rand() * 0.16;
      seeds.push({
        phase: rand() * Math.PI * 2,
        speed: 0.08 + rand() * 0.16,
        amp: 0.12 + rand() * 0.3,
        baseY: y,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      map: makeOrbTexture() ?? undefined,
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return { geometry, material, seeds };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pts = pointsRef.current;
    const grp = groupRef.current;

    if (pts) {
      const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < ORB_COUNT; i++) {
        const s = seeds[i];
        arr[i * 3 + 1] = s.baseY + Math.sin(t * s.speed + s.phase) * s.amp;
      }
      attr.needsUpdate = true;
    }

    if (grp) {
      // Parallax: ease toward the pointer rather than snapping to it.
      const p = pointer.current;
      grp.position.x += (p.x * 0.45 - grp.position.x) * 0.04;
      grp.position.y += (-p.y * 0.3 - grp.position.y) * 0.04;
      grp.rotation.z = Math.sin(t * 0.04) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  );
}

/**
 * Broad accent wash sitting behind the panel — the WebGL half of the rim
 * light. Additive, so it lifts the navy without flattening it.
 */
function AccentWash() {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: makeOrbTexture() ?? undefined,
        color: BLUE,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state) => {
    const m = ref.current;
    if (m) {
      const t = state.clock.elapsedTime;
      const s = 9 + Math.sin(t * 0.12) * 0.4;
      m.scale.set(s * 1.35, s * 0.72, 1);
    }
  });

  return (
    <mesh ref={ref} position={[0, -0.2, -3.4]} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

export default function HeroSceneAtmosphere({
  pointer,
  active,
}: {
  pointer: RefObject<Pointer>;
  active: boolean;
}) {
  return (
    <Canvas
      // "demand" parks the rAF loop but leaves the last frame painted, so
      // pausing off-screen or under reduced-motion costs nothing visually.
      frameloop={active ? "always" : "demand"}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <AccentWash />
      <Orbs pointer={pointer} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
