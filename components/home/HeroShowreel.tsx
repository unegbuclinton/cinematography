"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX, ArrowDown } from "lucide-react";
import ShowreelModal from "@/components/video/ShowreelModal";
import { profile } from "@/data/profile";

export default function HeroShowreel() {
  const [isMuted, setIsMuted] = useState(true);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById("featured-work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative h-screen w-full flex items-end justify-between overflow-hidden select-none">
        {/* Background Ambient Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/videos/video-one.mp4"
            poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
          />
          {/* Multi-layer cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20 flex flex-col justify-between h-full pt-32">
          {/* Top subtle banner indicator */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
              <span className="uppercase text-text-secondary">
                Visual Storytelling & Direction
              </span>
            </div>
            <div className="hidden sm:block text-right text-text-muted">
              • Lagos, Nigeria
            </div>
          </div>

          {/* Center-Bottom Typographic Composition */}
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-col">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-accent-gold-light mb-3">
                Selected Motion Picture Portfolio
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-text-primary font-normal leading-[0.95]">
                Atmosphere. <br />
                <span className="italic font-serif text-white/90">
                  Light in Motion.
                </span>
              </h1>
            </div>

            <p className="text-text-secondary text-sm md:text-lg max-w-2xl font-sans font-light leading-relaxed">
              {profile.heroStatement}
            </p>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setShowreelOpen(true)}
                data-cursor="PLAY"
                className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-text-primary hover:bg-accent-gold text-background font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Reel 2026</span>
              </button>

              <button
                onClick={toggleMute}
                aria-label={
                  isMuted
                    ? "Unmute ambient background audio"
                    : "Mute ambient audio"
                }
                className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-surface-elevated/80 hover:bg-surface-highlight backdrop-blur border border-border text-white/80 hover:text-white font-mono text-xs tracking-wider transition-colors"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-accent-gold" />
                    <span className="hidden sm:inline">Audio Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="hidden sm:inline">Audio Live</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Bar: Scroll Indicator */}
          <div className="flex items-end justify-between pt-8 border-t border-white/10">
            <button
              onClick={scrollToWork}
              aria-label="Scroll to featured work"
              className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-accent-gold transition-colors"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
            </button>

            <div className="font-mono text-xs text-text-muted flex items-center gap-3">
              <span>ARRI 65</span>
              <span>•</span>
              <span>35MM FILM</span>
              <span>•</span>
              <span>ANAMORPHIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel Modal */}
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
