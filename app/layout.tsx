import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kamsonondi.com"),
  title: {
    default: "Kamsochukwu Nnodi — Video Editor | Visual Storyteller",
    template: "%s — Kamsochukwu Nnodi",
  },
  description:
    "A collection of work exploring video editing, visual storytelling, AI-generated visuals, and creative content by Kamsochukwu Nnodi, based in Lagos, Nigeria.",
  keywords: [
    "Video Editor",
    "Visual Storyteller",
    "AI Video",
    "Social Media Content",
    "Kamsochukwu Nnodi",
    "Lagos Video Editor",
    "Nigerian Video Editor",
    "Branded Content",
  ],
  authors: [{ name: "Kamsochukwu Nnodi" }],
  openGraph: {
    title: "Kamsochukwu Nnodi — Video Editor | Visual Storyteller",
    description:
      "Video editing and visual storytelling portfolio.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jakarta.variable} ${mono.variable}`}
    >
      <body className="bg-background text-text-primary antialiased font-sans selection:bg-accent-gold selection:text-background min-h-screen flex flex-col">
        {/* Grain overlay for analog film aesthetic */}
        <div className="film-grain" aria-hidden="true" />

        {/* Context-aware custom cursor for desktop */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>

        {/* Global Editorial Footer */}
        <Footer />
      </body>
    </html>
  );
}
