import { ImageResponse } from "next/og";
import { content } from "@/data/content";

// Home-screen icon for iPhone/iPad (iOS rounds the corners itself).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e2333",
          color: "#f4efe6",
          fontSize: 112,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        {content.site.firstName.charAt(0)}
      </div>
    ),
    size,
  );
}
