import { useRef } from "react";
import { Link } from "react-router-dom";
import MazePattern from "../components/MazePattern";
import { mazeWide } from "../assets/mazePaths";
import { useReveal } from "../hooks/useReveal";
import Gear from "../components/Gear";
import { mision, novedades, services, vision } from "../data/content";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useReveal(heroRef, "[data-reveal]", { y: 24, stagger: 0.1, start: "top 95%" });
  useReveal(introRef, "[data-reveal]", { y: 20, stagger: 0.08 });
  useReveal(purposeRef, "[data-reveal]", { y: 20, stagger: 0.1 });
  useReveal(servicesRef, "[data-reveal]", { y: 20, stagger: 0.06 });
  useReveal(newsRef, "[data-reveal]", { y: 20, stagger: 0.08 });

  return (
    <>
      <section ref={heroRef} className="relative bg-ink text-paper pt-40 pb-28 md:pt-48 md:pb-36 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -bottom-16 opacity-[0.14]">
          <MazePattern data={mazeWide} color="var(--color-paper)" strokeWidth={7} className="w-full" />
        </div>
        <div className="pointer-events-none absolute -right-14 top-16 opacity-[0.08] w-[260px] h-[260px] md:w-[360px] md:h-[360px]">
          <Gear color="var(--color-paper)" className="w-full h-full" />
        </div>

        <div className="container-px relative">
          <div data-reveal className="eyebrow mb-7 flex items-center gap-3 text-paper/50">
            <span className="w-8 h-px bg-paper/40" />
            Gestión y profesionalización de empresas
          </div>

          <h1
            data-reveal
            className="max-w-3xl text-[2.4rem] leading-[1.08] sm:text-[3.2rem] md:text-[4rem] font-semibold tracking-tight"
          >
            Pensamos la gestión
            <br />
            como un <em className="italic font-normal">oxymoron:</em>
            <br />
            instinto y razón.
          </h1>

          <p data-reveal className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-paper/65">
            Asistimos a empresas, entidades deportivas y emprendedores en la
            profesionalización de su gestión y en la identificación,
            desarrollo y protección de sus activos intangibles.
          </p>

          <div data-reveal className="mt-11 flex flex-wrap items-center gap-4">
            <Link to="/contacto" className="btn-ink">
              Agendar consulta
              <span aria-hidden>→</span>
            </Link>
            <Link to="/servicios" className="btn-ghost !border-paper/35 !text-paper hover:!bg-paper hover:!text-ink">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div ref={introRef} className="container-px max-w-2xl">
          <div data-reveal className="eyebrow mb-5">Conócenos</div>
          <p data-reveal className="text-xl md:text-2xl leading-snug font-medium">
            Somos una empresa dedicada a la gestión y la profesionalización de
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
          <div data-reveal>
            <div className="eyebrow text-paper/50 mb-3">Nuestra visión</div>
            <p className="text-paper/75 leading-relaxed">{vision}</p>
          </div>
          <div data-reveal>
            <div className="eyebrow text-paper/50 mb-3">Nuestra misión</div>
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

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="container-px">
          <div className="eyebrow mb-5">Novedades</div>
          <div ref={newsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {novedades.map((n) => (
              <article key={n.slug} data-reveal className="bg-paper border border-line rounded-2xl p-7 flex flex-col">
                <h3 className="font-display text-lg font-semibold leading-snug">{n.title}</h3>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-mute flex-1">{n.excerpt}</p>
                <Link to="/novedades" className="mt-5 text-xs font-semibold text-mute-2 hover:text-ink transition-colors inline-flex items-center gap-1.5 w-fit">
                  Leer más <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
