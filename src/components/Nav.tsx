import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/novedades", label: "Novedades" },
  { href: "/contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every page here opens with a dark (bg-ink) hero band, so the nav needs
  // light text while it floats transparent over it, and only switches to
  // dark text once it gets its own opaque paper background on scroll.
  const onDark = !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between h-[74px]">
        <Logo size={17} withTagline={false} color={onDark ? "var(--color-paper)" : "var(--color-ink)"} />

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              end={l.href === "/"}
              className={({ isActive }) =>
                `text-[0.83rem] font-semibold tracking-wide transition-colors ${
                  onDark
                    ? isActive
                      ? "text-paper"
                      : "text-paper/70 hover:text-paper"
                    : isActive
                      ? "text-ink"
                      : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contacto"
          className={`hidden md:inline-flex !py-2.5 !px-5 !text-[0.8rem] ${
            onDark ? "btn-ghost !border-paper/35 !text-paper hover:!bg-paper hover:!text-ink" : "btn-ink"
          }`}
        >
          Agendar consulta
        </NavLink>

        <button
          aria-label="Abrir menú"
          className="md:hidden flex flex-col gap-1.5 w-8"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-[1.5px] transition-transform ${onDark && !open ? "bg-paper" : "bg-ink"} ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] transition-transform ${onDark && !open ? "bg-paper" : "bg-ink"} ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-line">
          <div className="container-px py-5 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink key={l.href} to={l.href} end={l.href === "/"} className="text-sm font-semibold" onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/contacto" className="btn-ink justify-center" onClick={() => setOpen(false)}>
              Agendar consulta
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
