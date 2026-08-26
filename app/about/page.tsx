import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Mail, ArrowUpRight, CheckCircle2, Globe } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About & Perspective",
  description:
    "Biography, creative philosophy, and representation for cinematographer & director Kamso Nondi based in Lagos, Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24 md:gap-36">
      {/* Header & Portrait Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Portrait & Studio Image */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-border bg-surface-elevated">
            <Image
              src={profile.portraitUrl}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-white">
              <div className="text-accent-gold uppercase tracking-widest font-semibold">
                {profile.name}
              </div>
              <div className="text-text-muted mt-0.5">{profile.location}</div>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-border-subtle bg-surface-elevated">
            <Image
              src={profile.studioImageUrl}
              alt="Camera rig on location"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] text-white/70 bg-black/60 px-2 py-1 rounded backdrop-blur">
              On Location • Digital & Celluloid Cinema
            </div>
          </div>
        </div>

        {/* Right: Personal Statement & Long Bio */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold">
              Cinematographer / Director
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-text-primary mt-2 leading-tight">
              Capturing the texture of light and human emotion.
            </h1>
          </div>

          <div className="p-6 rounded-sm bg-surface-elevated/60 border-l-2 border-accent-gold">
            <p className="font-serif italic text-lg sm:text-xl text-text-primary leading-relaxed">
              &ldquo;{profile.statement}&rdquo;
            </p>
          </div>

          <div className="flex flex-col gap-6 text-text-secondary font-sans leading-relaxed text-base md:text-lg font-light">
            {profile.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-border-subtle flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-gold hover:bg-accent-gold-light text-background font-mono text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Kamso Directly</span>
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-border hover:border-white/40 font-mono text-xs uppercase tracking-widest text-white transition-colors"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services & Capabilities */}
      <section className="border-t border-border-subtle pt-16">
        <div className="flex flex-col gap-2 mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold">
            Capabilities
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            Production & Direction Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.services.map((service, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-surface-elevated/40 border border-border-subtle flex items-start gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
              <p className="font-sans text-sm md:text-base text-text-primary font-light">
                {service}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Worldwide Representation */}
      <section className="border-t border-border-subtle pt-16">
        <div className="flex items-center gap-2 mb-3 text-accent-gold font-mono text-xs uppercase tracking-widest">
          <Globe className="w-4 h-4" />
          <span>Representation & Inquiries</span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-10">
          Management & Contacts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.representation.map((rep, idx) => (
            <div
              key={idx}
              className="p-8 rounded-sm bg-surface-elevated border border-border flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent-gold">
                  {rep.region}
                </span>
                <h3 className="font-serif text-2xl text-text-primary">
                  {rep.agency}
                </h3>
                <div className="font-mono text-xs text-text-muted">
                  {rep.location}
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex flex-col gap-1 font-mono text-xs">
                <span className="text-text-muted">{rep.contactName}</span>
                <a
                  href={`mailto:${rep.email}`}
                  className="text-text-primary hover:text-accent-gold transition-colors flex items-center gap-1"
                >
                  <span>{rep.email}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
