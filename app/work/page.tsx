"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ArrowUpRight, Film } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import VideoHoverPreview from "@/components/video/VideoHoverPreview";
import { projects } from "@/data/projects";
import { Project, ProjectCategory } from "@/types/project";

const categories: ("All" | ProjectCategory)[] = [
  "All",
  "Commercial",
  "Narrative",
  "Music Video",
  "Fashion",
  "Documentary",
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>(
    "All",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredListProject, setHoveredListProject] = useState<Project | null>(
    null,
  );

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 md:pt-40 pb-32 max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-subtle pb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-gold">
            Archive & Filmography
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-text-primary mt-2">
            Selected Works
          </h1>
          <p className="font-sans text-sm md:text-base text-text-secondary mt-3 max-w-xl">
            A curated index of commercials, narrative films, music videos, and
            editorial fashion pieces photographed worldwide.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-surface-elevated p-1 rounded-full border border-border self-start md:self-end">
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              viewMode === "grid"
                ? "bg-accent-gold text-background font-semibold"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              viewMode === "list"
                ? "bg-accent-gold text-background font-semibold"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Index</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto py-8 no-scrollbar border-b border-border-subtle mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count =
            cat === "All"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border ${
                isActive
                  ? "bg-white text-background border-white font-medium"
                  : "bg-surface text-text-secondary border-border hover:border-white/40 hover:text-white"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] ${
                  isActive ? "text-background/70" : "text-text-muted"
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid View Mode */}
      {viewMode === "grid" && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} variant="grid" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* List / Index View Mode with floating preview */}
      {viewMode === "list" && (
        <div className="relative w-full">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs font-mono text-text-muted uppercase tracking-widest">
            <span className="col-span-1">Year</span>
            <span className="col-span-4">Project Title</span>
            <span className="col-span-3">Client / Brand</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-1">Aspect</span>
            <span className="col-span-1 text-right">View</span>
          </div>

          {/* List Rows */}
          <div className="divide-y divide-border-subtle">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                onMouseEnter={() => setHoveredListProject(project)}
                onMouseLeave={() => setHoveredListProject(null)}
                data-cursor="VIEW"
                className="group py-6 md:py-5 flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center hover:bg-surface-elevated/60 transition-colors px-2 md:px-4 rounded-sm"
              >
                {/* Year */}
                <span className="font-mono text-xs text-text-muted md:col-span-1">
                  {project.year}
                </span>

                {/* Title */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <h3 className="font-serif text-lg md:text-xl text-text-primary group-hover:text-accent-gold transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Client */}
                <span className="font-sans text-sm text-text-secondary md:col-span-3">
                  {project.client}
                </span>

                {/* Category */}
                <span className="font-mono text-xs text-text-muted md:col-span-2 uppercase">
                  {project.category}
                </span>

                {/* Aspect */}
                <span className="font-mono text-xs text-text-muted md:col-span-1 hidden md:block">
                  {project.aspectRatio}
                </span>

                {/* Action arrow */}
                <div className="md:col-span-1 flex justify-end w-full md:w-auto">
                  <div className="p-2 rounded-full border border-border group-hover:border-accent-gold group-hover:text-accent-gold transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Floating Hover Video Card for List Mode on Desktop */}
          {hoveredListProject && (
            <div className="hidden lg:block fixed bottom-12 right-12 z-30 w-80 rounded-lg overflow-hidden border border-border shadow-2xl bg-surface-elevated pointer-events-none animate-fade-in">
              <div className="relative aspect-video w-full bg-black">
                <VideoHoverPreview
                  videoSrc={hoveredListProject.previewVideo}
                  posterSrc={hoveredListProject.posterImage}
                  altText={hoveredListProject.title}
                  aspectRatio="16:9"
                  isHovered={true}
                />
              </div>
              <div className="p-4 bg-surface flex flex-col gap-1">
                <div className="font-mono text-[10px] text-accent-gold uppercase tracking-wider">
                  {hoveredListProject.client}
                </div>
                <div className="font-serif text-sm text-white font-medium">
                  {hoveredListProject.title}
                </div>
                <div className="font-mono text-[10px] text-text-muted">
                  {hoveredListProject.specs.camera}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
          <Film className="w-8 h-8 text-text-muted" />
          <p className="font-serif text-lg text-text-secondary">
            No projects in this category at the moment.
          </p>
          <button
            onClick={() => setActiveCategory("All")}
            className="font-mono text-xs text-accent-gold underline uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
