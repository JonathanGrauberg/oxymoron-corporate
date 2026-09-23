import { useRef } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import HeroSlider from "../components/HeroSlider";
import LegalTeaser from "../components/LegalTeaser";
import { mision, services, vision } from "../data/content";

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useReveal(introRef, "[data-reveal]", { y: 20, stagger: 0.08 });
  useReveal(purposeRef, "[data-reveal]", { y: 20, stagger: 0.1 });
  useReveal(servicesRef, "[data-reveal]", { y: 20, stagger: 0.06 });

  return (
    <>
      <HeroSlider />

      <section className="py-24 md:py-32">
        <div ref={introRef} className="container-px max-w-2xl">
          <div data-reveal className="eyebrow mb-5">Conócenos</div>
          <p data-reveal className="text-xl md:text-2xl leading-snug font-medium">
            Somos una empresa dedicada a la profesionalización de
            la gestión, tanto de proyectos propios como de terceros.
          </p>
          <Link data-reveal to="/nosotros" className="btn-ghost mt-8 inline-flex">
            Más información
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <div className="bg-ink text-paper">
        <div ref={purposeRef} className="container-px grid sm:grid-cols-2 gap-10 py-16 md:py-20">
          <div data-reveal className="max-w-xs mx-auto text-center">
            <div className="eyebrow text-paper/50 mb-3 justify-center flex">Nuestra visión</div>
            <p className="text-paper/75 leading-relaxed">{vision}</p>
          </div>
          <div data-reveal className="max-w-xs mx-auto text-center">
            <div className="eyebrow text-paper/50 mb-3 justify-center flex">Nuestra misión</div>
            <p className="text-paper/75 leading-relaxed">{mision}</p>
          </div>
        </div>
      </div>

      <section className="py-24 md:py-32">
        <div className="container-px">
          <div className="eyebrow mb-5">Nuestros servicios</div>
          <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={`/servicios/${s.slug}`}
                data-reveal
                className="group border border-line p-7 rounded-2xl hover:border-ink transition-colors duration-400 bg-paper flex flex-col"
              >
                <span className="text-xs text-mute-2 num-tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-mute flex-1">{s.summary}</p>
                <span className="mt-5 text-xs font-semibold text-mute-2 group-hover:text-ink transition-colors inline-flex items-center gap-1.5">
                  Ver más <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LegalTeaser />
    </>
  );
}
