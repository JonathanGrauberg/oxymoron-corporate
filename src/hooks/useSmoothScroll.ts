import { useEffect } from "react";
import Lenis from "lenis";
import { setupGsap } from "../lib/gsapSetup";

/**
 * Wires up Lenis smooth scrolling and keeps GSAP's ScrollTrigger in sync
 * with it, so scroll-linked animations stay perfectly matched to the eased
 * scroll position instead of the raw native scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const { gsap, ScrollTrigger } = setupGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}
