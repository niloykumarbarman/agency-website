"use client";

import { getTechIcon } from "@/lib/techIcons";

interface TechBrandIconProps {
  name: string;
  className?: string;
}

export default function TechBrandIcon({ name, className }: TechBrandIconProps) {
  const icon = getTechIcon(name);
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill={`#${icon.hex}`} role="img" aria-label={icon.title}>
      <path d={icon.path} />
    </svg>
  );
}
