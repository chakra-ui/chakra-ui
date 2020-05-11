import { keyframes, Interpolation } from "@chakra-ui/system"

export const range = (count: number) =>
  Array(count)
    .fill(1)
    .map((_, idx) => idx + 1)

export const animation = (start: string, end: string) => keyframes`
  from {
    border-color: ${start};
    background: ${start};
  }
  to {
    border-color: ${end};
    background: ${end};
  }
`

interface GetStyleOptions {
  colorStart: any
  colorEnd: any
  speed: number
}

export function getStyle(options: GetStyleOptions): Interpolation {
  const { colorStart, colorEnd, speed } = options

  return {
    borderColor: colorStart,
    boxShadow: "none",
    opacity: 0.7,
    background: colorEnd,
    backgroundClip: "padding-box",
    cursor: "default",
    color: "transparent",
    animation: `${speed}s linear infinite alternate ${animation(
      colorStart,
      colorEnd,
    )}`,
    pointerEvents: "none",
    userSelect: "none",
    "&::before, &::after, *": {
      visibility: "hidden",
    },
  }
}

const fadeIn = keyframes`
from { opacity: 0; }
to   { opacity: 1; }
`

export const fadeInCss = (duration: number) => {
  const styles = {
    animation: `${fadeIn} ${duration}s`,
  } as const

  return styles
}
