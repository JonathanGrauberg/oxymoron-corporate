import { Link } from "react-router-dom";
import Gear from "./Gear";

interface LogoProps {
  size?: number;
  color?: string;
  withTagline?: boolean;
  className?: string;
}

export default function Logo({ size = 26, color = "currentColor", withTagline = true, className = "" }: LogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} style={{ color }}>
      <span className="font-display font-bold tracking-tight" style={{ fontSize: size }}>
        OXYMORON
      </span>
      <Gear size={size * 1.15} color={color} />
      {withTagline && (
        <span
          className="hidden sm:inline-block eyebrow"
          style={{ color, opacity: 0.6, letterSpacing: "0.35em", fontSize: size * 0.28 }}
        >
          FEEL·SMART
        </span>
      )}
    </Link>
  );
}
