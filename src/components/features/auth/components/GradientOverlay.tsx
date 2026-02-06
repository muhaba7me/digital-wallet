interface GradientOverlayProps {
  position: "top" | "bottom";
}

/**
 * Renders a gradient overlay at the top or bottom of the sidebar
 */
export default function GradientOverlay({ position }: GradientOverlayProps) {
  const gradientClass =
    position === "top" ? "from-primary/20 to-transparent" : "from-primary/20 to-transparent";
  const verticalClass = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      className={`absolute ${verticalClass} left-0 right-0 h-1/8 bg-gradient-to-${
        position === "top" ? "b" : "t"
      } ${gradientClass}`}
    />
  );
}
