"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Still } from "@/types/project";

interface LightboxProps {
  stills: Still[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  stills,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentStill = stills[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < stills.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // loop to beginning
    }
  }, [currentIndex, stills.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(stills.length - 1); // loop to end
    }
  }, [currentIndex, stills.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !currentStill) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12 select-none"
      >
        {/* Header Controls */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
          <div className="font-mono text-xs text-white/60 tracking-widest uppercase">
            FRAME {currentIndex + 1} / {stills.length}
          </div>

          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 border border-white/10 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Main Image View */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[78vh] w-full h-[78vh] flex flex-col items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src={currentStill.url}
              alt={currentStill.caption || "Cinematography still frame"}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Caption */}
          {currentStill.caption && (
            <p className="mt-4 font-mono text-xs md:text-sm text-text-secondary text-center max-w-2xl px-4">
              {currentStill.caption}
            </p>
          )}
        </motion.div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 border border-white/10 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
