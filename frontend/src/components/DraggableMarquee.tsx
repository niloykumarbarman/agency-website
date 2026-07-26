"use client";

import { useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

interface DraggableMarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  trackClassName?: string;
}

export default function DraggableMarquee({
  children,
  speed = 60,
  className = "",
  trackClassName = "",
}: DraggableMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const isDraggingRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const startClientXRef = useRef(0);
  const startXRef = useRef(0);
  const lastClientXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumUntilRef = useRef(0);

  function wrap(value: number, halfWidth: number) {
    let v = value;
    while (v <= -halfWidth) v += halfWidth;
    while (v > 0) v -= halfWidth;
    return v;
  }

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth === 0) return;

    if (isDraggingRef.current) return;

    const now = performance.now();
    if (now < momentumUntilRef.current) {
      const next = x.get() + (velocityRef.current * delta) / 1000;
      velocityRef.current *= 0.94;
      x.set(wrap(next, halfWidth));
      return;
    }

    if (isHovering) return;

    const next = x.get() - (speed * delta) / 1000;
    x.set(wrap(next, halfWidth));
  });

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    startClientXRef.current = e.clientX;
    startXRef.current = x.get();
    lastClientXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;

    const deltaX = e.clientX - startClientXRef.current;
    x.set(wrap(startXRef.current + deltaX, halfWidth));

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = ((e.clientX - lastClientXRef.current) / dt) * 1000;
    }
    lastClientXRef.current = e.clientX;
    lastTimeRef.current = now;
  }

  function endDrag() {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    momentumUntilRef.current = performance.now() + 900;
  }

  return (
    <div
      className={`cursor-grab select-none overflow-hidden touch-pan-y active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className={`flex w-max items-stretch ${trackClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
