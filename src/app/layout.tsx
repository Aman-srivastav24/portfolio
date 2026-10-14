import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import IntroLoader from "@/components/IntroLoader";
import { profile } from "@/data/portfolio";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.title}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} · ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-loading="" className={`${spaceGrotesk.variable} ${archivo.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        {/* Without JavaScript the intro can't finish, so skip it */}
        <noscript>
          <style>{`#intro{display:none}html[data-loading]{overflow:auto}html[data-loading] .rise{animation-play-state:running}`}</style>
        </noscript>
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
