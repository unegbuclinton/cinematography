"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import VideoHoverPreview from "@/components/video/VideoHoverPreview";
import { ArrowUpRight } from "lucide-react";
import { formatTimecode } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  variant?: "hero-feature" | "grid" | "compact" | "wide";
  priority?: boolean;
  className?: string;
}

export default function ProjectCard({
  project,
  variant = "grid",
  priority = false,
  className = "",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [detectedDuration, setDetectedDuration] = useState<string | null>(null);

  // Aspect ratio based on variant
  const cardAspectRatio =
    variant === "hero-feature"
      ? "2.39:1"
      : variant === "wide"
        ? "16:9"
        : project.aspectRatio || "16:9";

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="VIEW"
      className={`group block relative focus:outline-none rounded-sm transition-opacity duration-300 ${className}`}
    >
      {/* Visual Thumbnail / Video Hover Container */}
      <div className="relative w-full overflow-hidden bg-surface-elevated rounded-sm border border-border-subtle group-hover:border-border transition-colors duration-500">
        <VideoHoverPreview
          videoSrc={project.previewVideo}
          posterSrc={project.posterImage}
          altText={`${project.title} - ${project.client}`}
          aspectRatio={cardAspectRatio}
          isHovered={isHovered}
          priority={priority}
          onDurationLoaded={(durationInSeconds) => {
            if (durationInSeconds && durationInSeconds > 0) {
              setDetectedDuration(formatTimecode(durationInSeconds));
            }
          }}
        />

        {/* Minimal Corner Arrow Icon */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-accent-gold">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Dynamic Duration Tag */}
        <div className="absolute bottom-3 right-3 z-20 font-mono text-[10px] text-white/70 px-2 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
          {detectedDuration || project.duration}
        </div>
      </div>

      {/* Metadata & Editorial Titles */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-text-muted">
          <span className="text-accent-gold/90 font-medium">
            {project.client}
          </span>
          <span className="text-text-muted">
            {project.category} • {project.year}
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-text-primary tracking-wide transition-colors duration-300 group-hover:text-accent-gold-light">
          {project.title}
        </h3>

        {project.tagline && (
          <p className="text-xs sm:text-sm text-text-secondary line-clamp-1 font-sans font-light opacity-75 group-hover:opacity-95 transition-opacity">
            {project.tagline}
          </p>
        )}
      </div>
    </Link>
  );
}
