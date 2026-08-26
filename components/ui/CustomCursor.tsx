"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid trailing motion
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over element with data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest(
        "[data-cursor]",
      ) as HTMLElement | null;

      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor") || "");
        setIsHovered(true);
      } else {
        const isClickable = target?.closest(
          "a, button, input, [role='button']",
        );
        setCursorText("");
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Follower Ring / Badge */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`flex items-center justify-center rounded-full border border-accent-gold/60 backdrop-blur-sm transition-[width,height,background-color] duration-200 ${
          cursorText
            ? "w-20 h-20 bg-accent-gold/15 border-accent-gold"
            : isHovered
              ? "w-12 h-12 bg-white/10 border-white/40"
              : "w-8 h-8 bg-transparent"
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold tracking-widest text-accent-gold-light uppercase text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`rounded-full bg-accent-gold transition-all duration-150 ${
          cursorText ? "opacity-0 scale-0" : "w-1.5 h-1.5 opacity-90"
        }`}
      />
    </div>
  );
}
