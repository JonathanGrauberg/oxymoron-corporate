import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";

const LEGAL_URL = "https://legal.oxymoron.com.ar";

/**
 * Cross-promo hacia el sitio hermano de legales: una miniatura tipo
 * "ventana de navegador" con el propio sitio embebido en vivo (escalado),
 * así nunca queda desactualizada aunque legal-oxymoron cambie.
 */
export default function LegalTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, "[data-reveal]", { y: 20, stagger: 0.1 });

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

          {/* Miniatura en vivo del sitio de legales, escalada */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-ink">
            <div
              className="absolute top-0 left-0 origin-top-left pointer-events-none"
              style={{ width: "1440px", height: "900px", transform: "scale(0.361)" }}
            >
              <iframe
                src={LEGAL_URL}
                title="Vista previa de legal.oxymoron.com.ar"
                width={1440}
                height={900}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
                className="w-[1440px] h-[900px] border-0"
              />
            </div>
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
          </div>
        </a>
      </div>
    </section>
  );
}
