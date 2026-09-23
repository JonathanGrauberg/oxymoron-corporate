import { useRef } from "react";
import PageHero from "../components/PageHero";
import Avatar from "../components/Avatar";
import { useReveal } from "../hooks/useReveal";
import { aboutIntro, directors, team, whyOxymoron } from "../data/content";

export default function Nosotros() {
  const introRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useReveal(introRef, "[data-reveal]", { y: 20, stagger: 0.08 });
  useReveal(dirRef, "[data-reveal]", { y: 20, stagger: 0.1 });
  useReveal(teamRef, "[data-reveal]", { y: 18, stagger: 0.04 });
  useReveal(whyRef, "[data-reveal]", { y: 20, stagger: 0.08 });

  return (
    <>
      <PageHero eyebrow="Nosotros" title="¿Quiénes somos?" image="/images/quienes-somos.jpg" />

      <section className="py-20 md:py-28">
        <div ref={introRef} className="container-px max-w-3xl">
          <p data-reveal className="text-lg md:text-xl leading-relaxed text-mute">
            {aboutIntro}
          </p>
        </div>
      </section>

      <div className="bg-ink text-paper py-20 md:py-28">
        <div ref={dirRef} className="container-px grid sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
          {directors.map((d) => (
            <div key={d.name} data-reveal className="text-center flex flex-col items-center">
              <Avatar name={d.name} size={110} grayscale />
              <h3 className="mt-5 font-display text-lg font-semibold">{d.name}</h3>
              <div className="text-xs text-paper/50 mt-1 uppercase tracking-wide">{d.role}</div>
              <p className="mt-4 text-sm text-paper/65 leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 md:py-28">
        <div className="container-px">
          <div className="eyebrow mb-5 text-center">Equipo</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-14">
            Un cuerpo de profesionales y especialistas
          </h2>
          <div ref={teamRef} className="grid sm:grid-cols-2 gap-x-12 gap-y-12 max-w-2xl mx-auto">
            {team.map((m) => (
              <div key={m.name} data-reveal className="text-center flex flex-col items-center">
                <Avatar name={m.name} size={84} grayscale />
                <h3 className="mt-4 font-display text-base font-semibold">{m.name}</h3>
                <div className="text-xs text-mute-2 mt-0.5">{m.role}</div>
                <p className="mt-2.5 text-[0.8rem] leading-relaxed text-mute max-w-[220px]">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div ref={whyRef} className="container-px max-w-2xl mx-auto text-center">
          <h2 data-reveal className="text-2xl md:text-3xl font-semibold mb-6">¿Por qué Oxymoron?</h2>
          <p data-reveal className="text-mute leading-relaxed">{whyOxymoron}</p>
        </div>
      </section>
    </>
  );
}
