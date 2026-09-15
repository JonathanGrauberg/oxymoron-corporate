import { forwardRef } from "react";

interface GearProps {
  /** pixel size for standalone/inline use (e.g. in the Logo). Omit to have
   * the SVG fill its parent via CSS (use a sized wrapper + className) */
  size?: number;
  color?: string;
  className?: string;
  teeth?: number;
  eyeAngle?: number;
  /**
   * Tooth indices (0 = 3 o'clock, going clockwise) rendered as a sharp
   * single-point spike instead of the standard flat-topped tooth. Per the
   * brand manual, the isotype's side teeth — 3 o'clock and 9 o'clock — are
   * pointed while the other six stay flat-topped. Defaults to exactly that
   * for an 8-tooth gear; pass [] to get a uniform gear instead.
   */
  spikeIndices?: number[];
}

/**
 * Recreates the Oxymoron isotype: an 8-tooth gear with a
 * clock/eye pupil at its center. Built as a pure SVG path so it can be
 * freely rotated (via ref) for scroll-linked and idle animation.
 */
const Gear = forwardRef<SVGSVGElement, GearProps>(
  (
    {
      size,
      color = "currentColor",
      className = "",
      teeth = 8,
      eyeAngle = -35,
      spikeIndices = teeth === 8 ? [0, 4] : [],
    },
    ref
  ) => {
    const cx = 60;
    const cy = 60;
    const outerR = 52;
    const spikeOuterR = outerR * 1.09;
    const rootR = 40;
    const toothWidth = ((2 * Math.PI) / teeth) * 0.34;

    const points: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a0 = (i / teeth) * Math.PI * 2;
      const aNextRoot = a0 + Math.PI / teeth;
      const aPrevRoot = a0 - Math.PI / teeth;

      const rootPrevX = cx + rootR * Math.cos(aPrevRoot);
      const rootPrevY = cy + rootR * Math.sin(aPrevRoot);
      const rootNextX = cx + rootR * Math.cos(aNextRoot);
      const rootNextY = cy + rootR * Math.sin(aNextRoot);

      points.push(`${rootPrevX.toFixed(2)},${rootPrevY.toFixed(2)}`);

      if (spikeIndices.includes(i)) {
        // Single sharp apex — no flat top.
        const tipX = cx + spikeOuterR * Math.cos(a0);
        const tipY = cy + spikeOuterR * Math.sin(a0);
        points.push(`${tipX.toFixed(2)},${tipY.toFixed(2)}`);
      } else {
        const aHalf = toothWidth / 2;
        const aOutStart = a0 - aHalf;
        const aOutEnd = a0 + aHalf;
        const outStartX = cx + outerR * Math.cos(aOutStart);
        const outStartY = cy + outerR * Math.sin(aOutStart);
        const outEndX = cx + outerR * Math.cos(aOutEnd);
        const outEndY = cy + outerR * Math.sin(aOutEnd);
        points.push(`${outStartX.toFixed(2)},${outStartY.toFixed(2)}`);
        points.push(`${outEndX.toFixed(2)},${outEndY.toFixed(2)}`);
      }

      points.push(`${rootNextX.toFixed(2)},${rootNextY.toFixed(2)}`);
    }

    const gearPath = `M${points.join(" L")} Z`;

    const eyeOuterR = 22;
    const eyeInnerR = 13;
    const notchStart = (eyeAngle - 34) * (Math.PI / 180);
    const notchEnd = (eyeAngle + 34) * (Math.PI / 180);
    const nx0 = cx + eyeInnerR * Math.cos(notchStart);
    const ny0 = cy + eyeInnerR * Math.sin(notchStart);
    const nx1 = cx + eyeInnerR * Math.cos(notchEnd);
    const ny1 = cy + eyeInnerR * Math.sin(notchEnd);

    return (
      <svg
        ref={ref}
        {...(size ? { width: size, height: size } : {})}
        viewBox="0 0 120 120"
        fill="none"
        className={className}
        style={{ transformOrigin: "60px 60px", display: "block" }}
      >
        <path d={gearPath} fill={color} fillRule="evenodd" />
        <circle cx={cx} cy={cy} r={eyeOuterR} fill="var(--color-paper, #F6F5F1)" />
        <path
          d={`M${cx},${cy} L${nx0.toFixed(2)},${ny0.toFixed(2)} A${eyeInnerR} ${eyeInnerR} 0 1 0 ${nx1.toFixed(2)} ${ny1.toFixed(2)} Z`}
          fill={color}
        />
      </svg>
    );
  }
);

Gear.displayName = "Gear";

export default Gear;
