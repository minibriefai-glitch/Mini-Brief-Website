import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, metadata } from "@/content/home";
import { brandColors, WORDMARK } from "@/lib/brand";

export const alt = metadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time from local files; nothing is fetched.
export default async function OpengraphImage() {
  const [icon, shot, interRegular, interSemiBold] = await Promise.all([
    readFile(join(process.cwd(), "public/photos/MiniBrief-Icon-Mono-Ink.png")),
    readFile(join(process.cwd(), "public/shots/hero.png")),
    readFile(join(process.cwd(), "app/fonts/og/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/Inter-SemiBold.ttf")),
  ]);
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
  const shotSrc = `data:image/png;base64,${shot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: brandColors.page,
          color: brandColors.ink,
          padding: "56px 64px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img elements */}
          <img src={iconSrc} width={52} height={52} style={{ borderRadius: 12 }} alt="" />
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", display: "flex" }}>{WORDMARK}</div>
        </div>

        <div
          style={{
            marginTop: 44,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid rgba(7,9,26,0.10)",
            background: "#FFFFFF",
            color: brandColors.mutedText,
            fontSize: 16,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, background: brandColors.blue, display: "flex" }} />
          {hero.eyebrow}
        </div>

        <div
          style={{
            marginTop: 26,
            fontSize: 58,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            maxWidth: 540,
            display: "flex",
          }}
        >
          {hero.h1}
        </div>
        <div style={{ marginTop: 20, fontSize: 22, lineHeight: 1.4, color: brandColors.mutedText, maxWidth: 520, display: "flex" }}>
          {hero.sub}
        </div>

        {/* The product, framed, rising from the bottom-right corner. */}
        <div
          style={{
            position: "absolute",
            left: 660,
            top: 236,
            width: 680,
            display: "flex",
            flexDirection: "column",
            borderRadius: 18,
            border: "1px solid rgba(7,9,26,0.12)",
            background: "#FFFFFF",
            boxShadow: "0 40px 80px rgba(7,9,26,0.22)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 16px", background: brandColors.page, borderBottom: "1px solid rgba(7,9,26,0.06)" }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "rgba(7,9,26,0.12)", display: "flex" }} />
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "rgba(7,9,26,0.12)", display: "flex" }} />
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "rgba(7,9,26,0.12)", display: "flex" }} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img elements */}
          <img src={shotSrc} width={680} height={425} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
