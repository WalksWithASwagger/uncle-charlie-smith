import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PeriodToTop } from "@/components/PeriodToTop";
import { Critters } from "@/components/Critters";

const display = Oswald({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://contraptionism.com"),
  title: {
    default: "Contraptionism — Charlie “Blackcat” Smith",
    template: "%s · Contraptionism",
  },
  description:
    "The fire-ritual machines of Charlie “Blackcat” Smith — community-built metal mythologies that turn fabrication, fuel, danger, memory, and participation into temporary social architecture.",
  openGraph: {
    title: "Contraptionism — Charlie “Blackcat” Smith",
    description: "Community-built kinetic fire sculpture. 30 years of flaming-steel tomfoolery.",
    type: "website",
    images: ["/api/og"],
  },
  twitter: { card: "summary_large_image", images: ["/api/og"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <PeriodToTop />
        <Critters />
        <Analytics />
      </body>
    </html>
  );
}
