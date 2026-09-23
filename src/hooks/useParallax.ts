import { useEffect, type RefObject } from "react";
import { setupGsap } from "../lib/gsapSetup";

interface ParallaxOptions {
  /** total vertical travel as a percentage of the element's own height */
  distance?: number;
}

/**
 * Moves an element up/down as its containing section crosses the viewport,
 * scrubbed directly to scroll position (no easing lag) for a classic
 * background-parallax feel.
 */
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ParallaxOptions = {}
) {
  const { distance = 14 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.closest("section") ?? el.parentElement ?? el;
    const { gsap } = setupGsap();

    const tween = gsap.fromTo(
      el,
      { yPercent: -distance / 2 },
      {
        yPercent: distance / 2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, distance]);
}
