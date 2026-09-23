import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MazePattern from "./MazePattern";
import { mazeWide } from "../assets/mazePaths";
import { heroSlides } from "../data/content";
import { useParallax } from "../hooks/useParallax";

const AUTOPLAY_MS = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useParallax(bgRef, { distance: 12 });

  function go(i: number) {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(index + 1), AUTOPLAY_MS);
  }

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section className="relative bg-ink text-paper pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[640px] md:min-h-[720px] flex items-end">
      {/* Fondos de cada slide, con cross-fade + parallax. El wrapper mide de
          más (116% de alto) para tener margen de sobra al moverse con el
          scroll sin dejar ver el borde. Mientras no exista la foto en
          public/images/, se ve el patrón de laberinto como placeholder. */}
      <div ref={bgRef} className="absolute inset-x-0 -top-[8%] h-[116%]">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.slug}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            {loadedImages[slide.slug] ? (
              <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 opacity-[0.16]">
                <MazePattern data={mazeWide} color="var(--color-paper)" strokeWidth={7} className="w-full h-full" />
              </div>
            )}
            {/* Sonda oculta: si la foto existe, marca el slide como "con imagen". */}
            <img
              src={slide.image}
              alt=""
              className="hidden"
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [slide.slug]: true }))}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          </div>
        ))}
      </div>

      <div className="container-px relative w-full">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.slug}
            className="transition-opacity duration-700"
            style={{
              opacity: i === index ? 1 : 0,
              position: i === index ? "static" : "absolute",
              pointerEvents: i === index ? "auto" : "none",
            }}
            aria-hidden={i !== index}
          >
            <h1 className="max-w-3xl text-[2.4rem] leading-[1.08] sm:text-[3.2rem] md:text-[4rem] font-semibold tracking-tight">
              {slide.title}
            </h1>
            <div className="mt-6 inline-block bg-paper/10 border border-paper/20 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="text-[0.78rem] font-semibold tracking-wide text-paper/85">{slide.subtitle}</span>
            </div>
            <div className="mt-9">
              <Link to={`/servicios/${slide.slug}`} className="btn-ink">
                Más información
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        ))}

        <div className="mt-14 flex items-center gap-6">
          <div className="flex gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.slug}
                aria-label={`Ir al slide ${slide.title}`}
                onClick={() => {
                  go(i);
                  resetTimer();
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-paper" : "w-1.5 bg-paper/35 hover:bg-paper/60"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              aria-label="Slide anterior"
              onClick={() => {
                go(index - 1);
                resetTimer();
              }}
              className="w-10 h-10 rounded-full border border-paper/25 flex items-center justify-center text-paper/70 hover:text-paper hover:border-paper/50 transition-colors"
            >
              ←
            </button>
            <button
              aria-label="Slide siguiente"
              onClick={() => {
                go(index + 1);
                resetTimer();
              }}
              className="w-10 h-10 rounded-full border border-paper/25 flex items-center justify-center text-paper/70 hover:text-paper hover:border-paper/50 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
