"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { formatTimecode, getAspectRatioClass } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  client?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  loop?: boolean;
  mutedDefault?: boolean;
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  client,
  aspectRatio = "16:9",
  autoPlay = false,
  loop = false,
  mutedDefault = false,
  className = "",
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(mutedDefault);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHoveringScrubber, setIsHoveringScrubber] = useState(false);
  const [scrubPreviewTime, setScrubPreviewTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(autoPlay);
  const [letterboxActive, setLetterboxActive] = useState(
    aspectRatio === "2.39:1",
  );
  const [isLoading, setIsLoading] = useState(false);

  // Auto-hide controls when playing and inactive
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    if (isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  // Update buffered progress
  const handleProgress = () => {
    const video = videoRef.current;
    if (video && video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const totalDuration = video.duration || 1;
      setBuffered((bufferedEnd / totalDuration) * 100);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
      }
      // On user play action, ensure audio is unmuted unless explicitly muted by user
      if (mutedDefault && !hasStarted) {
        video.muted = false;
        setIsMuted(false);
        setVolume(1);
        video.volume = 1;
      } else {
        video.muted = isMuted;
      }

      video.play().catch((err) => {
        console.warn("Playback error:", err);
      });
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.8);
      video.volume = 0.8;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setScrubPreviewTime(pos * duration);
    setIsHoveringScrubber(true);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen to fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (!containerRef.current) return;
      // Only react if active or hovered
      const isFocused = containerRef.current.contains(document.activeElement);
      if (!isFocused && !isFullscreen) return;

      switch (e.code) {
        case "Space":
        case "KeyK":
          e.preventDefault();
          togglePlay();
          resetControlsTimer();
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          resetControlsTimer();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
              0,
              videoRef.current.currentTime - 5,
            );
            resetControlsTimer();
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
              duration,
              videoRef.current.currentTime + 5,
            );
            resetControlsTimer();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [duration, isFullscreen, isMuted, isPlaying, resetControlsTimer]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
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
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={`Video player for ${title || "cinematic work"}`}
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      style={isFullscreen ? undefined : { aspectRatio: numericAspect }}
      className={`relative w-full overflow-hidden bg-black select-none group focus:outline-none focus:ring-1 focus:ring-accent-gold/40 ${
        isFullscreen
          ? "h-screen w-screen flex items-center justify-center"
          : aspectClass
      } ${className}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onProgress={handleProgress}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        onClick={togglePlay}
        className={`w-full h-full object-contain cursor-pointer ${
          letterboxActive ? "letterbox-bars" : ""
        }`}
      />

      {/* Initial Poster Play Overlay */}
      {!hasStarted && poster && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 hover:bg-black/20"
        >
          <div className="relative group/play flex items-center justify-center">
            <div className="absolute -inset-4 rounded-full bg-accent-gold/20 blur-md transition-all duration-300 group-hover/play:scale-125" />
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-text-primary transition-transform duration-300 group-hover/play:scale-110 group-hover/play:border-accent-gold">
              <Play className="w-8 h-8 ml-1 text-accent-gold fill-accent-gold/20 transition-transform duration-200 group-hover/play:scale-105" />
            </div>
          </div>

          {(title || client) && (
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
              <div>
                {client && (
                  <p className="text-xs uppercase tracking-widest text-accent-gold mb-1 font-mono">
                    {client}
                  </p>
                )}
                {title && (
                  <h3 className="text-lg md:text-xl font-serif tracking-wide text-white">
                    {title}
                  </h3>
                )}
              </div>
              <div className="text-xs font-mono text-white/60 bg-black/40 px-2 py-1 rounded backdrop-blur border border-white/10">
                {aspectRatio}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-20">
          <div className="w-10 h-10 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
        </div>
      )}

      {/* Center Play/Pause indicator on click toggle */}
      <div
        onClick={togglePlay}
        className="absolute inset-0 z-0 flex items-center justify-center cursor-pointer"
      />

      {/* Bottom Gradient Overlay for readability */}
      <div
        className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Custom Control Bar */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 px-4 py-3 md:px-6 md:py-4 transition-all duration-300 ease-out flex flex-col gap-2 ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Scrubber Timeline Bar */}
        <div
          className="relative group/timeline cursor-pointer py-2"
          onMouseMove={handleScrubberMouseMove}
          onMouseLeave={() => setIsHoveringScrubber(false)}
        >
          {/* Hover Timecode Tooltip */}
          {isHoveringScrubber && (
            <div
              className="absolute -top-7 transform -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[11px] font-mono text-white border border-white/10 pointer-events-none shadow-lg"
              style={{
                left: `${(scrubPreviewTime / (duration || 1)) * 100}%`,
              }}
            >
              {formatTimecode(scrubPreviewTime)}
            </div>
          )}

          {/* Background Track */}
          <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden transition-all duration-150 group-hover/timeline:h-2">
            {/* Buffered progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full transition-all duration-300"
              style={{ width: `${buffered}%` }}
            />
            {/* Played progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-accent-gold rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Range input for scrubbing */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek video playback"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-white text-xs md:text-sm">
          {/* Left: Play/Pause, Replay, Timecode */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-1 text-white hover:text-accent-gold transition-colors focus:outline-none"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            {/* Timecode Indicator */}
            <div className="font-mono text-xs tracking-wider text-white/80 flex items-center gap-1">
              <span className="text-white">{formatTimecode(currentTime)}</span>
              <span className="text-white/40">/</span>
              <span>{formatTimecode(duration)}</span>
            </div>
          </div>

          {/* Right: Volume, Letterbox toggle, Fullscreen */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Volume Control */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-1 text-white hover:text-accent-gold transition-colors focus:outline-none"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <div className="w-16 md:w-20 hidden group-hover/vol:flex items-center transition-all">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume slider"
                  className="w-full h-1 bg-white/30 rounded-lg accent-accent-gold cursor-pointer"
                />
              </div>
            </div>

            {/* Aspect Ratio Badge */}
            <div className="hidden sm:inline-block font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-white/20 text-white/70">
              {aspectRatio}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="p-1 text-white hover:text-accent-gold transition-colors focus:outline-none"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
