import { Link } from "react-router-dom";
import Logo from "./Logo";
import { contactInfo, services } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper pt-20 pb-8">
      <div className="container-px grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-12">
        <div>
          <Logo size={17} color="var(--color-paper)" />
          <p className="mt-5 text-sm text-paper/50 max-w-xs leading-relaxed">
            Gestión y profesionalización de empresas, entidades deportivas e
            intangibles. Feel Smart.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-paper/40 mb-4">Servicios</div>
          <ul className="space-y-2.5 text-sm text-paper/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="hover:text-paper transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-widest uppercase text-paper/40 mb-4">Contacto</div>
          <ul className="space-y-2.5 text-sm text-paper/70">
            <li>{contactInfo.email}</li>
            <li>{contactInfo.instagram}</li>
          </ul>
          <div className="flex gap-4 mt-5">
            <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-paper/60 hover:text-paper transition-colors">
              <FacebookIcon />
            </a>
            <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-paper/60 hover:text-paper transition-colors">
              <InstagramIcon />
            </a>
            <a href={contactInfo.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-paper/60 hover:text-paper transition-colors">
              <YoutubeIcon />
            </a>
            <a href={contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-paper/60 hover:text-paper transition-colors">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="container-px mt-16 pt-6 border-t border-paper/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-paper/40">
        <span>© {year} Oxymoron. Todos los derechos reservados.</span>
        <div className="flex gap-6">
          <span>Privacidad</span>
          <span>Términos</span>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.35C16.2 4.3 15.2 4.2 14.05 4.2c-2.4 0-4.05 1.47-4.05 4.15V10.5H7.5v3h2.5V21h3.5z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 20h-2.94v-6.13c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.36 1.6-2.36 3.24V20H9.72V8.5h2.82v1.57h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.64 1.96 3.64 4.5V20z" />
    </svg>
  );
}
