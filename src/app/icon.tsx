import { ImageResponse } from "next/og";
import { content } from "@/data/content";

// Browser tab icon: the first letter of your name on a navy tile.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 16,
          color: "#f4efe6",
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        {content.site.firstName.charAt(0)}
      </div>
    ),
    size,
  );
}
