import { forwardRef } from "react";
import type { MazeData } from "../assets/mazePaths";

interface MazePatternProps {
  data: MazeData;
  className?: string;
  strokeWidth?: number;
  color?: string;
  preserveAspectRatio?: string;
}

/**
 * Renders a procedurally generated labyrinth as a single SVG path so it can
 * be "drawn" via stroke-dasharray / stroke-dashoffset animation on scroll.
 */
const MazePattern = forwardRef<SVGPathElement, MazePatternProps>(
  ({ data, className = "", strokeWidth = 9, color = "currentColor", preserveAspectRatio = "xMidYMid meet" }, ref) => {
    return (
      <svg
        viewBox={`-${strokeWidth} -${strokeWidth} ${data.width + strokeWidth * 2} ${data.height + strokeWidth * 2}`}
        className={className}
        preserveAspectRatio={preserveAspectRatio}
      >
        <path
          ref={ref}
          d={data.d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </svg>
    );
  }
);

MazePattern.displayName = "MazePattern";

export default MazePattern;
