import { useEffect, type RefObject } from "react";
import { setupGsap } from "../lib/gsapSetup";

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}

/**
 * Fades + slides children (or the container itself) into place once as the
 * section enters the viewport. Selector defaults to direct reveal-item
 * children; pass `selector: null` to animate the container itself.
 */
export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  selector: string | null = "[data-reveal]",
  options: RevealOptions = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = setupGsap();

    const targets = selector ? el.querySelectorAll(selector) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          delay: options.delay ?? 0,
          stagger: options.stagger ?? 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 80%",
          },
        }
      );
    }, el);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
