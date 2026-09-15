import { useRef } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";
import { novedades } from "../data/content";

export default function Novedades() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, "[data-reveal]", { y: 20, stagger: 0.06 });

  return (
    <>
      <PageHero eyebrow="Prensa" title="Novedades" />

      <section className="py-20 md:py-28">
        <div className="container-px">
          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {novedades.map((n) => (
              <Link
                key={n.slug}
                to={`/novedades/${n.slug}`}
                data-reveal
                className="group border border-line rounded-2xl overflow-hidden hover:border-ink transition-colors duration-300 bg-paper flex flex-col"
              >
                {n.image && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold leading-snug">{n.title}</h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-mute flex-1">{n.excerpt}</p>
                  <span className="mt-5 text-xs font-semibold text-mute-2 group-hover:text-ink transition-colors inline-flex items-center gap-1.5 w-fit">
                    Leer más <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
