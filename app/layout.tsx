import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PULP Coffee Atelier — Specialty coffee, Riverside District",
  description:
    "Single-farm coffee roasted light, croissants laminated over three days, and a room built for lingering. Reserve a table at PULP Coffee Atelier, 214 Calder Street, Brooklyn.",
  openGraph: {
    title: "PULP Coffee Atelier",
    description: "Coffee is a fruit. We treat it like one.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121110",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <noscript>
          <style>{`[data-preloader]{display:none!important}`}</style>
        </noscript>
        <a
          href="#manifesto"
          className="mono fixed left-4 top-4 z-[100] -translate-y-20 bg-bone px-4 py-3 text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
