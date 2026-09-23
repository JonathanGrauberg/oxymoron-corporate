interface AvatarProps {
  name: string;
  /**
   * Ruta a la foto (ej. "/team/araceli-beisel.jpg"). Mientras no esté
   * definida, se muestran las iniciales del nombre en un círculo —
   * reemplazar simplemente agregando este campo en `content.ts`.
   */
  photo?: string;
  size?: number;
  grayscale?: boolean;
  /** blanco y negro por defecto, a color al hacer hover — requiere que el
   * contenedor padre tenga la clase "group" (Tailwind group-hover). */
  hoverColor?: boolean;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase() && /[A-ZÁÉÍÓÚÑ]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function Avatar({ name, photo, size = 88, grayscale = false, hoverColor = false, className = "" }: AvatarProps) {
  return (
    <div
      className={`rounded-full overflow-hidden bg-ink text-paper flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          className={`w-full h-full object-cover object-top ${
            hoverColor
              ? "grayscale group-hover:grayscale-0 transition-[filter] duration-500"
              : grayscale
                ? "grayscale"
                : ""
          }`}
        />
      ) : (
        <span className="font-display font-semibold" style={{ fontSize: size * 0.32 }}>
          {initials(name)}
        </span>
      )}
    </div>
  );
}
