import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, metadata } from "@/content/home";
import { WORDMARK } from "@/lib/brand";

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
          background: "#080d1b",
          color: "#ffffff",
          padding: "48px 64px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 650,
            display: "flex",
            background:
              "radial-gradient(ellipse at 100% 45%, rgba(58,95,220,0.24), rgba(8,13,27,0) 75%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={iconSrc}
              width={46}
              height={46}
              style={{ borderRadius: 12 }}
              alt=""
            />
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "-0.035em",
                display: "flex",
              }}
            >
              {WORDMARK}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 16, color: "#a7b0c4" }}>
            minibrief.app
          </div>
        </div>

        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#a4b8ff",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 28,
              height: 1,
              background: "#a4b8ff",
            }}
          />
          Gmail + Outlook. One clear brief.
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.055em",
            display: "flex",
            flexDirection: "column",
            width: 620,
          }}
        >
          <div style={{ display: "flex" }}>{hero.h1}</div>
          <div style={{ display: "flex", color: "#a4b8ff" }}>
            {hero.accent}
          </div>
        </div>

        <div
          style={{
            marginTop: 25,
            fontSize: 21,
            lineHeight: 1.5,
            color: "#a7b0c4",
            width: 510,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>Replies in your voice.</div>
          <div style={{ display: "flex" }}>Every promise in view.</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 57,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "16px 22px",
              borderRadius: 10,
              background: "#a4b8ff",
              color: "#080d1b",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {hero.primary.label}
            <span style={{ fontSize: 21 }}>↗</span>
          </div>
          <div style={{ display: "flex", fontSize: 15, color: "#a7b0c4" }}>
            Now in beta
          </div>
        </div>

        {/* Crop the existing product shot to its brief pane, preserving its proportions. */}
        <div
          style={{
            position: "absolute",
            left: 720,
            top: 167,
            width: 596,
            height: 540,
            display: "flex",
            flexDirection: "column",
            borderRadius: 17,
            border: "1px solid rgba(164,184,255,0.28)",
            background: "#10182b",
            boxShadow: "0 28px 90px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 42,
              padding: "0 20px",
              background: "#111a2f",
              borderBottom: "1px solid rgba(164,184,255,0.15)",
              color: "#c5cde0",
              fontSize: 12,
            }}
          >
            <span>Your morning brief</span>
            <span style={{ color: "#8996b2" }}>MiniBrief</span>
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              height: 498,
              overflow: "hidden",
              background: "#f3f4f6",
            }}
          >
            <img
              src={shotSrc}
              width={1040}
              height={650}
              alt=""
              style={{ position: "absolute", left: -424, top: -30 }}
            />
          </div>
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
