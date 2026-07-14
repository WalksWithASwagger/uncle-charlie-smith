import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Contraptionism").slice(0, 90);
  const sub = (searchParams.get("sub") ?? "Charlie “Blackcat” Smith").slice(0, 120);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0c0a09",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(240,83,28,0.35), transparent 45%), radial-gradient(circle at 95% 100%, rgba(255,178,46,0.18), transparent 45%)",
          padding: "80px",
        }}
      >
        <div style={{ color: "#ffb22e", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
          {sub}
        </div>
        <div
          style={{
            color: "#ece4d6",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 24,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 40, height: 6, width: 280, background: "linear-gradient(90deg,#f0531c,#ffb22e,transparent)" }} />
        <div style={{ color: "#a89f8f", fontSize: 24, marginTop: 28 }}>
          Community-built kinetic fire sculpture · contraptionism.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
