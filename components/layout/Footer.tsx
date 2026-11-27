"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [lagosTime, setLagosTime] = useState("");
  const [ldnTime, setLdnTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLagosTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
      setLdnTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-border-subtle bg-surface/80 relative z-20">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Large Statement */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                {profile.availability}
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-normal leading-tight">
              Let&apos;s create something{" "}
              <span className="italic font-serif text-accent-gold-light">
                unforgettable.
              </span>
            </h2>

            <p className="text-text-secondary text-sm md:text-base max-w-xl font-sans leading-relaxed mt-2">
              Currently accepting commercial treatments, narrative scripts, and
              creative collaborations worldwide.
            </p>
          </div>

          {/* Right Direct Action */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end justify-between h-full">
            <div className="flex flex-col gap-2 lg:text-right">
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                Direct Inquiries
              </span>
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 text-lg md:text-xl font-mono text-text-primary hover:text-accent-gold transition-colors text-left lg:text-right"
              >
                <span>{profile.contactEmail}</span>
                <span className="p-1.5 rounded bg-surface-elevated border border-border group-hover:border-accent-gold transition-colors">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-text-muted group-hover:text-accent-gold" />
                  )}
                </span>
              </button>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-background font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-accent-gold/20 hover:scale-105"
            >
              <span>Initiate Project Brief</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mid Divider with Clocks */}
        <div className="mt-16 pt-8 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs text-text-muted">
          <div>
            <div className="uppercase tracking-widest text-[10px] text-text-secondary">
              Lagos (WAT)
            </div>
            <div className="text-sm text-text-primary mt-1">
              {lagosTime || "12:00:00"}
            </div>
          </div>
          <div>
            <div className="uppercase tracking-widest text-[10px] text-text-secondary">
              London (BST)
            </div>
            <div className="text-sm text-text-primary mt-1">
              {ldnTime || "12:00:00"}
            </div>
          </div>
          <div>
            <div className="uppercase tracking-widest text-[10px] text-text-secondary">
              Location
            </div>
            <div className="text-sm text-text-primary mt-1">Lagos, Nigeria</div>
          </div>
          <div>
            <div className="uppercase tracking-widest text-[10px] text-text-secondary">
              Availability
            </div>
            <div className="text-sm text-text-primary mt-1">
              Worldwide Travel
            </div>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-text-muted">
          <div className="flex items-center gap-6">
            {profile.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold transition-colors flex items-center gap-1"
              >
                <span>{s.name}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-center sm:text-right">
            <span>
              © {new Date().getFullYear()} KAMSOCHUKWU NNODI. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
