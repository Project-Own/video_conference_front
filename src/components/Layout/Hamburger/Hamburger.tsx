import { IconButton } from "@mui/material";
import anime from "animejs";
import { FC, SVGProps, useEffect, useRef, useState } from "react";

const Hamburger: FC<SVGProps<SVGSVGElement> & { toggle?: () => void }> = (
  props
) => {
  const [state, toggleState] = useState(false);
  const topRef = useRef<SVGPathElement>(null);
  const middleRef = useRef<SVGPathElement>(null);
  const bottomRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  let { toggle, ...otherProps } = props;

  useEffect(() => {
    const easingIn = "easeInOutElastic(1, .6)";
    const easingOut = "easeOutElastic(1, .6)";
    const duration = 250;
    // close
    if (state) {
      anime({
        targets: topRef.current,
        d: [{ value: "M 3 16.5 L 17 2.5 z" }],
        duration: duration,
        easing: easingIn,
      });
      anime({
        targets: middleRef.current,
        opacity: 0,
        duration: duration,
        easing: easingIn,
      });
      anime({
        targets: bottomRef.current,
        d: [{ value: "M 3 2.5 L 17 16.346 Z" }],
        duration: duration,
        easing: easingIn,
      });
      // hamburger
    } else {
      anime({
        targets: topRef.current,
        d: [{ value: "M 2 2.5 L 20 2.5 Z" }],
        duration: duration,
        easing: easingOut,
      });
      anime({
        targets: middleRef.current,
        opacity: 1,
        duration: duration,
        easing: easingOut,
      });
      anime({
        targets: bottomRef.current,
        d: [{ value: "M 2 16.346 L 20 16.346 Z" }],
        duration: duration,
        easing: easingOut,
      });
    }
  }, [state]);
  return (
    <IconButton
      onClick={() => {
        toggleState(!state);
        if (toggle) toggle();
      }}
      onMouseEnter={() => {
        anime({
          targets: svgRef.current,
          scale: 1.3,
          duration: 100,
          easing: "spring",
        });
      }}
      onMouseLeave={() => {
        anime({
          targets: svgRef.current,
          scale: 1.2,
          duration: 100,
          easing: "spring",
        });
      }}
    >
      <svg ref={svgRef} viewBox="0 0 20 20" {...otherProps}>
        <path ref={topRef} d="M 2 2.5 L 20 2.5 Z"></path>
        <path ref={middleRef} d="M 2 9.423 L 20 9.423 Z"></path>
        <path ref={bottomRef} d="M 2 16.346 L 20 16.346 Z"></path>
      </svg>
    </IconButton>
  );
};
Hamburger.defaultProps = {
  height: 28,
  width: 28,
  stroke: "green",
  fill: "transparent",
  strokeWidth: 2,
  toggle: () => {},
};

export default Hamburger;
