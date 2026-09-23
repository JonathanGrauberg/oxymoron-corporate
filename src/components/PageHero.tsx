import { useRef } from "react";
import MazePattern from "./MazePattern";
import { mazeWide } from "../assets/mazePaths";
import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** ruta de la foto de fondo (ej. "/images/contacto.jpg"). Opcional — sin
   * ella queda el fondo negro con el patrón de laberinto, como antes. */
  image?: string;
}

/** Shared dark header band used at the top of every inner page. */
export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  useReveal(ref, "[data-reveal]", { y: 20, stagger: 0.08 });
  useParallax(bgRef, { distance: 16 });

  return (
    <section className="relative bg-ink text-paper pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      {image && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={bgRef}
            src={image}
            alt=""
            className="pointer-events-none absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 via-45% to-transparent" />
        </div>
      )}

      {!image && (
        <div className="pointer-events-none absolute inset-x-0 -bottom-16 opacity-[0.14]">
          <MazePattern data={mazeWide} color="var(--color-paper)" strokeWidth={7} className="w-full" />
        </div>
      )}
      {!image && (
        <img
          src="/isotipo-blanco.png"
          alt=""
          className="pointer-events-none absolute -right-10 -top-10 opacity-[0.1] w-[220px] h-[220px] md:w-[300px] md:h-[300px] object-contain"
        />
      )}

      <div ref={ref} className="container-px relative">
        <div data-reveal className="eyebrow mb-5 text-paper/50">
          {eyebrow}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-[3.4rem] leading-[1.1] font-semibold max-w-2xl" data-reveal>
          {title}
        </h1>
        {subtitle && (
          <p data-reveal className="mt-6 max-w-xl text-paper/65 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
