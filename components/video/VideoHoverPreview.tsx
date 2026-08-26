"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { getAspectRatioClass } from "@/lib/utils";

interface VideoHoverPreviewProps {
  videoSrc: string;
  posterSrc: string;
  altText: string;
  aspectRatio?: string;
  isHovered?: boolean;
  priority?: boolean;
  className?: string;
  onDurationLoaded?: (duration: number) => void;
}

export default function VideoHoverPreview({
  videoSrc,
  posterSrc,
  altText,
  aspectRatio = "16:9",
  isHovered = false,
  priority = false,
  className = "",
  onDurationLoaded,
}: VideoHoverPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    // Check if device supports hover (non-touch)
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) {
      setShouldPlay(false);
      return;
    }

    if (isHovered && !hasError) {
      setShouldPlay(true);
    } else {
      setShouldPlay(false);
    }
  }, [isHovered, hasError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      playPromiseRef.current = video.play();
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {
          // Playback might be blocked or cancelled
        });
      }
    } else {
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          if (!shouldPlay && video) {
            video.pause();
            video.currentTime = 0;
          }
        });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [shouldPlay]);

  const aspectClass = getAspectRatioClass(aspectRatio);
  const numericAspect =
    aspectRatio === "2.39:1"
      ? "2.39 / 1"
      : aspectRatio === "2.35:1"
        ? "2.35 / 1"
        : aspectRatio === "4:3"
          ? "4 / 3"
          : aspectRatio === "9:16"
            ? "9 / 16"
            : "16 / 9";

  return (
    <div
      style={{ aspectRatio: numericAspect }}
      className={`relative w-full overflow-hidden bg-[#0A0A0E] ${aspectClass} ${className}`}
    >
      {/* Fallback & Poster Still */}
      <Image
        src={posterSrc}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
          isHovered ? "scale-105" : "scale-100"
        } ${isVideoLoaded && shouldPlay ? "opacity-0" : "opacity-100"}`}
      />

      {/* Video Loop Element (Muted & Loop) */}
      {!hasError && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onLoadedMetadata={() => {
            if (videoRef.current && onDurationLoaded) {
              onDurationLoaded(videoRef.current.duration);
            }
          }}
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out pointer-events-none ${
            isHovered ? "scale-105" : "scale-100"
          } ${isVideoLoaded && shouldPlay ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Subtle Dark Vignette Border */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-60 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
