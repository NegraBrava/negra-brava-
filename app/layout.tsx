import type { Metadata } from "next";
import { Cormorant_Garamond, Kaushan_Script, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const script = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Negra Brava — Soy fuego, soy estilo, soy Brava",
    template: "%s | Negra Brava",
  },
  description:
    "Aros, collares, pulseras y anillos de diseño chileno. No es joyería, es identidad.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Negra Brava",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" className={`${display.variable} ${script.variable} ${body.variable}`}>
      <body className="bg-nb-black font-body text-nb-cream antialiased">
        {children}
      </body>
    </html>
  );
}
