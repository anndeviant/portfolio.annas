"use client";

import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1,
    });

    const debugWindow = window as typeof window & {
      __portfolioLenis?: Lenis;
    };
    debugWindow.__portfolioLenis = lenis;

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      delete debugWindow.__portfolioLenis;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed left-2 top-0 bottom-0 z-50 w-px bg-white/10"
    >
      <motion.div
        className="h-full origin-top bg-cyan-200"
        style={{ scaleY }}
      />
    </div>
  );
}
