import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";
import { services } from "../data/content";

export default function ServicioDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, "[data-reveal]", { y: 20, stagger: 0.08 });

  if (!service) return <Navigate to="/servicios" replace />;

  return (
    <>
      <PageHero eyebrow="Servicios" title={service.title} subtitle={service.subtitle} />

      <section className="py-20 md:py-28">
        <div ref={ref} className="container-px grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
          {service.features.length > 0 && (
            <div data-reveal className="grid gap-5 content-start">
              {service.features.map((f) => (
                <div key={f} className="border border-line rounded-2xl p-6">
                  <p className="text-sm leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          )}

          <div data-reveal className={service.features.length > 0 ? "" : "lg:col-span-2 max-w-2xl"}>
            <div className="space-y-5 text-mute leading-relaxed">
              {service.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link to="/contacto" className="btn-ink mt-10 inline-flex">
              Envíe su consulta
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
