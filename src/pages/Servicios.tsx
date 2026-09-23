import { useRef } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";
import { pillars, services } from "../data/content";

export default function Servicios() {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useReveal(pillarsRef, "[data-reveal]", { y: 20, stagger: 0.1 });
  useReveal(listRef, "[data-reveal]", { y: 20, stagger: 0.06 });

  return (
    <>
      <PageHero eyebrow="Servicios" title="Nuestros servicios" image="/images/nuestros-servicios.png" />

      <div className="bg-ink text-paper py-20 md:py-28">
        <div ref={pillarsRef} className="container-px grid sm:grid-cols-3 gap-10">
          {pillars.map((p) => (
            <div key={p.title} data-reveal>
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm text-paper/65 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 md:py-28">
        <div className="container-px">
          <div ref={listRef} className="grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={`/servicios/${s.slug}`}
                data-reveal
                className="group border border-line p-8 rounded-2xl hover:border-ink transition-colors duration-400 bg-paper flex flex-col"
              >
                <span className="text-xs text-mute-2 num-tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute flex-1">{s.summary}</p>
                <span className="mt-6 text-xs font-semibold text-mute-2 group-hover:text-ink transition-colors inline-flex items-center gap-1.5">
                  Ver más <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
