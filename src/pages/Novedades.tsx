import { useRef } from "react";
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
              <article key={n.slug} data-reveal className="border border-line rounded-2xl p-7 flex flex-col bg-paper">
                <h3 className="font-display text-lg font-semibold leading-snug">{n.title}</h3>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-mute flex-1">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
