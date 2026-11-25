import { ImageResponse } from "next/og";
import { content } from "@/data/content";

const { site } = content;

// The preview card shown when the site is shared (LinkedIn, X, WhatsApp, Slack…).
export const alt = `${site.name} — ${site.title.join(" ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#f4efe6";
const INK = "#1e2333";
const SOFT = "#5e5f66";
const MAUVE = "#9c8790";

export default function OpengraphImage() {
  const families = ["#1e2333", "#4a5468", "#9c8790", "#c4b3ba", "#d9cfbf", "#ebe4d8"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Giant faded first name, like the hero */}
        <div
          style={{
            position: "absolute",
            right: -20,
            top: 120,
            fontSize: 300,
            fontWeight: 700,
            letterSpacing: -18,
            color: INK,
            opacity: 0.05,
            textTransform: "uppercase",
          }}
        >
          {site.firstName}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {families.map((c) => (
            <div key={c} style={{ width: 22, height: 22, borderRadius: 6, background: c }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 8, color: SOFT, textTransform: "uppercase" }}>{site.name}</div>
          <div
            style={{
              marginTop: 18,
              fontSize: 112,
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: -5,
              color: INK,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{site.title[0]}</span>
            <span style={{ color: MAUVE, fontStyle: "italic", fontWeight: 400 }}>{site.title[1]}</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: SOFT, maxWidth: 860 }}>{site.subtitle}</div>
        </div>
      </div>
    ),
    size,
  );
}
