"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Layers,
  MapPin,
  Sparkles,
  Sliders,
  Expand,
} from "lucide-react";
import VideoPlayer from "@/components/video/VideoPlayer";
import Lightbox from "@/components/ui/Lightbox";
import { Project } from "@/types/project";

interface ProjectDetailClientProps {
  project: Project;
  nextProject: Project;
}

export default function ProjectDetailClient({
  project,
  nextProject,
}: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allGalleryImages = [...project.stills, ...(project.btsPhotos || [])];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 md:pt-36 pb-32 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
      {/* Top Back Link & Category */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-6">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Archive</span>
        </Link>

        <div className="font-mono text-xs text-text-muted uppercase tracking-widest flex items-center gap-2">
          <span>{project.category}</span>
          <span>•</span>
          <span className="text-accent-gold font-medium">{project.year}</span>
        </div>
      </div>

      {/* Project Title & Client Header */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20">
            {project.client}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Role: {project.role}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-text-primary tracking-tight font-normal leading-tight">
          {project.title}
        </h1>

        {project.tagline && (
          <p className="font-serif italic text-lg sm:text-2xl text-text-secondary">
            &ldquo;{project.tagline}&rdquo;
          </p>
        )}
      </div>

      {/* Main Feature Video Player */}
      <div className="w-full rounded-sm overflow-hidden border border-border shadow-2xl bg-black">
        <VideoPlayer
          src={project.heroVideo}
          poster={project.posterImage}
          title={project.title}
          client={project.client}
          aspectRatio={project.aspectRatio}
          autoPlay={false}
          loop={false}
          mutedDefault={false}
          className="w-full"
        />
      </div>

      {/* Technical Specifications Grid */}
      <section className="bg-surface-elevated/60 border border-border-subtle p-6 md:p-10 rounded-sm">
        <div className="flex items-center gap-2 mb-8 text-accent-gold font-mono text-xs uppercase tracking-widest">
          <Camera className="w-4 h-4" />
          <span>Cinematography & Technical Package</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
          {project.specs.camera && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Camera Body
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.camera}
              </span>
            </div>
          )}

          {project.specs.lenses && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Optics & Lenses
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.lenses}
              </span>
            </div>
          )}

          {project.specs.aspectRatio && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Framing & Aspect
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.aspectRatio}
              </span>
            </div>
          )}

          {project.specs.format && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Capture Format
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.format}
              </span>
            </div>
          )}

          {project.specs.fps && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Frame Rate & Shutter
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.fps} ({project.specs.shutter || "180°"})
              </span>
            </div>
          )}

          {project.specs.colorist && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Color Grading
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.colorist}
              </span>
            </div>
          )}

          {project.specs.location && (
            <div className="col-span-2">
              <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                Location
              </span>
              <span className="text-text-primary font-medium text-sm">
                {project.specs.location}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Narrative Context & Directorial Approach */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold block mb-2">
            Synopsis
          </span>
          <p className="font-serif text-xl md:text-2xl text-text-primary leading-relaxed">
            {project.synopsis}
          </p>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 text-text-secondary font-sans leading-relaxed text-base md:text-lg">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold block">
            Treatment & Visual Direction
          </span>
          <p>{project.story}</p>
        </div>
      </div>

      {/* Frame Grabs & Stills Gallery */}
      {project.stills.length > 0 && (
        <section className="flex flex-col gap-8 pt-8 border-t border-border-subtle">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
                Frame Grabs
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-text-primary mt-1">
                Selected Stills
              </h2>
            </div>
            <span className="font-mono text-xs text-text-muted">
              Click frame to enlarge
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {project.stills.map((still, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                data-cursor="EXPAND"
                className="group relative aspect-video bg-surface-elevated rounded-sm overflow-hidden border border-border-subtle cursor-pointer"
              >
                <Image
                  src={still.url}
                  alt={still.caption || `${project.title} still`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <p className="font-mono text-xs text-white">
                    {still.caption}
                  </p>
                </div>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Behind the Scenes Section */}
      {project.btsPhotos && project.btsPhotos.length > 0 && (
        <section className="flex flex-col gap-8 pt-8 border-t border-border-subtle">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
              Production
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mt-1">
              Behind the Scenes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {project.btsPhotos.map((bts, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(project.stills.length + idx)}
                data-cursor="EXPAND"
                className="group relative aspect-video bg-surface-elevated rounded-sm overflow-hidden border border-border-subtle cursor-pointer"
              >
                <Image
                  src={bts.url}
                  alt={bts.caption || "Behind the scenes"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <p className="font-mono text-xs text-white">{bts.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Credits Table */}
      <section className="pt-12 border-t border-border-subtle">
        <div className="flex items-center gap-2 mb-8 text-accent-gold font-mono text-xs uppercase tracking-widest">
          <Layers className="w-4 h-4" />
          <span>Full Production Credits</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.credits.map((credit, idx) => (
            <div
              key={idx}
              className="flex flex-col border-b border-border-subtle pb-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {credit.role}
              </span>
              <span className="font-serif text-base text-text-primary mt-0.5">
                {credit.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Next Project Seamless Transition Card */}
      <section className="mt-12 pt-16 border-t border-border">
        <Link
          href={`/work/${nextProject.slug}`}
          data-cursor="NEXT"
          className="group block relative p-8 md:p-14 rounded-sm bg-surface-elevated border border-border hover:border-accent-gold transition-all duration-500 overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
            <Image
              src={nextProject.posterImage}
              alt={nextProject.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-elevated via-surface-elevated/70 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>

            <h3 className="font-serif text-3xl md:text-5xl text-text-primary group-hover:text-accent-gold-light transition-colors">
              {nextProject.title}
            </h3>

            <div className="font-mono text-xs text-text-muted uppercase">
              {nextProject.client} • {nextProject.category} ({nextProject.year})
            </div>
          </div>
        </Link>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        stills={allGalleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
