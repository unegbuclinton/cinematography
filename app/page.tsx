import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Disc } from "lucide-react";
import HeroShowreel from "@/components/home/HeroShowreel";
import ClientMarquee from "@/components/home/ClientMarquee";
import ProjectCard from "@/components/ui/ProjectCard";
import { getFeaturedProjects, projects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const heroProj = featuredProjects[0];
  const secondProj = featuredProjects[1];
  const thirdProj = featuredProjects[2];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Ambient Hero Showreel */}
      <HeroShowreel />

      {/* 2. Curated Selected Works */}
      <section
        id="featured-work"
        className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full flex flex-col gap-16 md:gap-24"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-text-primary tracking-tight font-normal mt-1">
              Selected Works
            </h2>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-gold transition-colors"
          >
            <span>All Works ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Selected Work Layout: 1 Primary Feature + 2 Editorial Side-by-Side */}
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Primary Featured Master Piece */}
          {heroProj && (
            <div className="w-full">
              <ProjectCard
                project={heroProj}
                variant="hero-feature"
                priority={true}
              />
            </div>
          )}

          {/* 2 Balanced Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {secondProj && <ProjectCard project={secondProj} variant="grid" />}
            {thirdProj && <ProjectCard project={thirdProj} variant="grid" />}
          </div>
        </div>

        {/* View All Works Callout */}
        <div className="text-center pt-8 border-t border-border-subtle">
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-border hover:border-accent-gold bg-surface-elevated hover:bg-surface-highlight text-text-primary font-mono text-xs uppercase tracking-widest transition-all duration-300 group hover:scale-105"
          >
            <span>View Complete Filmography</span>
            <ArrowRight className="w-4 h-4 text-accent-gold transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 3. Director Statement & Craft Philosophy */}
      <section className="border-t border-border-subtle bg-surface/30 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-border-subtle bg-surface-elevated">
              <Image
                src={profile.portraitUrl}
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-white/90">
                <div className="uppercase tracking-widest text-accent-gold font-medium">
                  {profile.name}
                </div>
                <div className="text-text-muted mt-0.5">
                  Director of Photography • {profile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Statement Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-accent-gold font-mono text-xs uppercase tracking-widest">
              <Disc className="w-3.5 h-3.5 animate-spin" />
              <span>Directing Perspective</span>
            </div>

            <blockquote className="font-serif text-2xl md:text-4xl text-text-primary font-normal leading-snug">
              &ldquo;{profile.statement}&rdquo;
            </blockquote>

            <div className="flex flex-col gap-4 text-text-secondary text-sm md:text-base font-sans font-light leading-relaxed">
              <p>{profile.longBio[0]}</p>
              <p>{profile.longBio[1]}</p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-gold hover:text-accent-gold-light transition-colors"
              >
                <span>Read Full Biography & Services</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Client Marquee */}
      <ClientMarquee />
    </div>
  );
}
