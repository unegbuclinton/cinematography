"use client";

import React, { useEffect, useRef } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  posterUrl: string;
  directorName: string;
}

export default function ShowreelModal({
  isOpen,
  onClose,
  videoUrl,
  posterUrl,
  directorName,
}: ShowreelModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
        >
          {/* Header Bar */}
          <div className="absolute top-4 left-6 right-6 md:top-8 md:left-12 md:right-12 flex items-center justify-between z-50 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                {directorName} — DIRECTORS SHOWREEL
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Showreel"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10"
            >
              <span>Close</span>
              <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl max-h-[85vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black"
          >
            <VideoPlayer
              src={videoUrl}
              poster={posterUrl}
              title={`${directorName} — Showreel`}
              client="Selected Cinematography"
              aspectRatio="16:9"
              autoPlay={true}
              loop={true}
              mutedDefault={false}
              className="w-full h-auto max-h-[85vh]"
            />
          </motion.div>

          {/* Footer note */}
          <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[11px] text-white/40 pointer-events-none">
            PRESS{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">
              ESC
            </kbd>{" "}
            TO EXIT
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
