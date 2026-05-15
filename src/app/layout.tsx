import type { Metadata } from "next";
import { Chakra_Petch, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nayan Suryavanshi — Cyber Prototype",
  description:
    "A polished creative multi-section prototype with loading motion, cipher text effects, command overlay, and crosshair-driven interactions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} data-theme="light">
      <body>{children}</body>
    </html>
  );
}
