"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Menu, X, ArrowUpRight } from "lucide-react";
import ShowreelModal from "@/components/video/ShowreelModal";
import { profile } from "@/data/profile";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border-subtle py-4 shadow-xl"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Moniker */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] font-medium text-text-primary group-hover:text-accent-gold transition-colors duration-300">
              KAMSO NONDI
            </span>
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-text-muted uppercase group-hover:text-text-secondary transition-colors">
              Cinematographer / Director
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                      isActive
                        ? "text-accent-gold"
                        : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent-gold shadow-[0_0_8px_rgba(201,160,80,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Showreel Button */}
            <button
              onClick={() => setShowreelOpen(true)}
              data-cursor="PLAY"
              aria-label="Play showreel"
              className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase bg-surface-elevated hover:bg-surface-highlight border border-border px-3.5 py-1.5 rounded-full transition-all duration-300 text-white/90 hover:text-accent-gold hover:border-accent-gold/50"
            >
              <Play className="w-3 h-3 text-accent-gold fill-accent-gold" />
              <span>Showreel</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setShowreelOpen(true)}
              aria-label="Play showreel"
              className="p-2 rounded-full bg-surface-elevated border border-border text-accent-gold"
            >
              <Play className="w-3.5 h-3.5 fill-accent-gold" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-text-primary hover:text-accent-gold focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Navigation
            </span>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-serif text-3xl tracking-wide transition-colors ${
                    isActive
                      ? "text-accent-gold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowreelOpen(true);
              }}
              className="flex items-center justify-between pt-4 border-t border-border-subtle text-left"
            >
              <span className="font-serif text-2xl text-accent-gold">
                Watch Showreel
              </span>
              <Play className="w-5 h-5 text-accent-gold fill-accent-gold" />
            </button>
          </div>

          <div className="flex flex-col gap-4 border-t border-border-subtle pt-6">
            <div className="text-xs font-mono text-text-muted">
              Location: Lagos, Nigeria • Worldwide Availability
            </div>
            <div className="text-xs font-mono text-accent-gold">
              {profile.contactEmail}
            </div>
          </div>
        </div>
      )}

      {/* Showreel Modal Component */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoUrl={profile.showreelUrl}
        posterUrl={profile.showreelPoster}
        directorName={profile.name}
      />
    </>
  );
}
