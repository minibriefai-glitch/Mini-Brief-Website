"use client";

/**
 * Site-wide ambient dot field. A single fixed, full-viewport layer of soft
 * glowing circles that drift gently behind ALL content — the hero's ambient
 * orb feeling, extended across the whole page so the circles no longer stop
 * where the hero ends.
 *
 * Fixed (viewport-anchored), so the dots stay in view and drift as you scroll
 * through every section. Pure CSS motion (transform only), aria-hidden,
 * pointer-events-none, sits at z-0 behind the z-[1] content, and freezes under
 * prefers-reduced-motion via the global reduced-motion rule.
 *
 * Positions are a fixed table (no Math.random) so server and client markup
 * match — no hydration mismatch.
 */

// [ x%, y%, size(px), opacity, dur(s), delay(s), dx(px), dy(px), violet ]
const DOTS: [number, number, number, number, number, number, number, number, 0 | 1][] = [
  [6, 12, 3, 0.45, 15, 0, 14, -10, 0],
  [14, 68, 5, 0.32, 18, 2, -12, 16, 1],
  [22, 30, 2, 0.55, 12, 1, 10, 12, 0],
  [30, 82, 4, 0.3, 20, 3, 16, -12, 1],
  [38, 18, 6, 0.26, 22, 1.5, -14, 14, 0],
  [46, 55, 2, 0.58, 13, 0.5, 12, -10, 0],
  [54, 88, 3, 0.4, 16, 2.5, -10, -14, 1],
  [62, 24, 4, 0.34, 19, 1, 14, 12, 0],
  [70, 64, 2, 0.55, 12, 3, -12, 10, 1],
  [78, 36, 5, 0.3, 21, 0.8, 12, -16, 0],
  [86, 78, 3, 0.42, 17, 2, -14, 12, 0],
  [92, 20, 2, 0.5, 14, 1.2, 10, 14, 1],
  [10, 44, 4, 0.32, 20, 2.2, 12, -12, 0],
  [26, 92, 3, 0.36, 15, 0.4, -10, -12, 1],
  [42, 8, 2, 0.5, 13, 3.2, 14, 12, 0],
  [58, 40, 3, 0.4, 18, 1.6, -12, -14, 0],
  [66, 90, 4, 0.28, 22, 0.6, 12, 14, 1],
  [74, 10, 2, 0.55, 12, 2.8, -10, 12, 0],
  [82, 52, 3, 0.42, 16, 1.1, 14, -12, 0],
  [90, 60, 5, 0.26, 21, 3.4, -14, 12, 1],
  [4, 84, 3, 0.4, 17, 1.9, 12, -10, 0],
  [18, 6, 2, 0.5, 14, 0.9, -12, 14, 1],
  [50, 72, 4, 0.32, 19, 2.6, 12, 12, 0],
  [34, 50, 2, 0.52, 13, 1.4, -10, -12, 0],
];

export function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      {DOTS.map(([x, y, size, op, dur, delay, dx, dy, violet], i) => {
        const core = violet ? "168,140,255" : "150,168,255";
        const glow = violet ? "123,92,255" : "91,114,255";
        return (
          <span
            key={i}
            className="ambient-dot"
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: op,
                background: `rgba(${core},0.95)`,
                boxShadow: `0 0 ${size * 3}px ${size * 0.6}px rgba(${glow},0.5)`,
                "--dur": `${dur}s`,
                "--delay": `${delay}s`,
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
