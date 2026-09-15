import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";
import { novedades } from "../data/content";

export default function NovedadDetail() {
  const { slug } = useParams();
  const novedad = novedades.find((n) => n.slug === slug);

  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, "[data-reveal]", { y: 20, stagger: 0.06 });

  if (!novedad) return <Navigate to="/novedades" replace />;

  const recent = novedades.filter((n) => n.slug !== novedad.slug).slice(0, 3);
  const body = novedad.body ?? [novedad.excerpt];

  return (
    <>
      <PageHero eyebrow="Novedades" title={novedad.title} />

      <section className="py-16 md:py-24">
        <div ref={ref} className="container-px grid lg:grid-cols-[1.4fr_0.9fr] gap-14">
          <div data-reveal>
            {novedad.image && (
              <div className="rounded-2xl overflow-hidden border border-line mb-8">
                <img src={novedad.image} alt={novedad.title} className="w-full h-auto" />
              </div>
            )}
            {novedad.date && (
              <div className="eyebrow mb-6">{novedad.date}</div>
            )}
            <div className="space-y-5 text-mute leading-relaxed max-w-2xl">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <Link to="/novedades" className="btn-ghost mt-10 inline-flex">
              <span aria-hidden>←</span>
              Volver a novedades
            </Link>
          </div>

          {recent.length > 0 && (
            <aside data-reveal className="space-y-6">
              <div className="eyebrow mb-2">Recientes</div>
              {recent.map((n) => (
                <Link
                  key={n.slug}
                  to={`/novedades/${n.slug}`}
                  className="group block border border-line rounded-2xl overflow-hidden hover:border-ink transition-colors duration-300 bg-paper"
                >
                  {n.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold leading-snug">{n.title}</h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-mute line-clamp-3">{n.excerpt}</p>
                    <span className="mt-3 text-xs font-semibold text-mute-2 group-hover:text-ink transition-colors inline-flex items-center gap-1.5">
                      Leer más <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
