import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";

const LEGAL_URL = "https://legal.oxymoron.com.ar";
const SOURCE_WIDTH = 1440;
const SOURCE_HEIGHT = 900;

/**
 * Cross-promo hacia el sitio hermano de legales: una miniatura tipo
 * "ventana de navegador" con el propio sitio embebido en vivo (escalado),
 * así nunca queda desactualizada aunque legal-oxymoron cambie.
 */
export default function LegalTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const frameBoxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useReveal(ref, "[data-reveal]", { y: 20, stagger: 0.1 });

  useEffect(() => {
    const el = frameBoxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / SOURCE_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="container-px grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
        <div data-reveal>
          <div className="eyebrow mb-5">Oxymoron Legal</div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight max-w-md">
            También pensamos el derecho.
          </h2>
          <p className="mt-5 text-mute leading-relaxed max-w-md">
            Oxymoron Legal es nuestro estudio boutique especializado en
            derecho internacional y en la protección de activos intangibles
            — la misma filosofía de gestión que aplicamos en las empresas,
            ahora puesta al servicio del asesoramiento jurídico.
          </p>
          <a href={LEGAL_URL} target="_blank" rel="noopener noreferrer" className="btn-ink mt-8 inline-flex">
            Visitar legal.oxymoron.com.ar
            <span aria-hidden>→</span>
          </a>
        </div>

        <a
          data-reveal
          href={LEGAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-line bg-ink overflow-hidden shadow-sm hover:shadow-md hover:border-ink transition-all duration-300"
        >
          {/* Barra tipo ventana de navegador */}
          <div className="flex items-center gap-2 px-4 py-3 bg-ink-2 border-b border-paper/10">
            <span className="w-2.5 h-2.5 rounded-full bg-paper/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/25" />
            <span className="ml-3 text-[0.7rem] text-paper/50 font-medium tracking-wide">
              legal.oxymoron.com.ar
            </span>
          </div>

          {/* Miniatura en vivo del sitio de legales. El iframe se renderiza a
              su tamaño real (1440x900) y se escala para llenar exactamente
              el ancho disponible del contenedor — el alto del contenedor se
              calcula con la misma escala, así nunca sobra franja negra. */}
          <div
            ref={frameBoxRef}
            className="relative w-full overflow-hidden bg-ink"
            style={{ height: scale ? SOURCE_HEIGHT * scale : undefined, aspectRatio: scale ? undefined : `${SOURCE_WIDTH} / ${SOURCE_HEIGHT}` }}
          >
            {scale > 0 && (
              <div
                className="absolute top-0 left-0 origin-top-left pointer-events-none"
                style={{ width: SOURCE_WIDTH, height: SOURCE_HEIGHT, transform: `scale(${scale})` }}
              >
                <iframe
                  src={LEGAL_URL}
                  title="Vista previa de legal.oxymoron.com.ar"
                  width={SOURCE_WIDTH}
                  height={SOURCE_HEIGHT}
                  loading="lazy"
                  scrolling="no"
                  tabIndex={-1}
                  className="border-0"
                  style={{ width: SOURCE_WIDTH, height: SOURCE_HEIGHT }}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
          </div>
        </a>
      </div>
    </section>
  );
}
