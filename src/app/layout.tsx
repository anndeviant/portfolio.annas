import type { Metadata, Viewport } from "next";

import ParticleBackground from "../components/ParticleBackground";
import SmoothScroll from "../components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Annas | Software Engineer and AI Builder",
  description:
    "A premium interactive portfolio for Annas, focused on software engineering, data science, machine learning, and modern web experiences.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ParticleBackground />
        <div className="relative z-10">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
