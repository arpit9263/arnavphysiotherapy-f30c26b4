import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin premium scroll progress bar pinned to the top of the viewport.
 * Uses a spring so motion feels organic, not linear.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-primary via-primary-glow to-brand-cyan pointer-events-none"
    />
  );
}
