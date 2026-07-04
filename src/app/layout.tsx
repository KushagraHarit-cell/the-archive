import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import LenisScroller from "@/components/LenisScroller";
import LuxuryCursor from "@/components/ui/LuxuryCursor";
import VinylPlayer from "@/components/ui/VinylPlayer";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "For My Forever Favourite",
  description: "A private collection of memories created for one extraordinary person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-[#C8A96A] selection:text-[#050505]">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} min-h-full flex flex-col relative`}
      >
        <LuxuryCursor />
        <div className="film-grain" />
        <LenisScroller>
          <main className="flex-grow w-full relative z-10">
            {children}
          </main>
        </LenisScroller>
        <VinylPlayer />
      </body>
    </html>
  );
}
