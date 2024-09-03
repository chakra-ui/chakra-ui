import { createComponent } from "./create-component"

export const FloatAnatomy = createComponent((props) => {
  const { palette, ...rest } = props
  return (
    <svg
      width={400}
      height={300}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x={148} y={101} width={103} height={97} fill={palette[2]} />
      <rect
        x={232.5}
        y={82.5}
        width={37}
        height={37}
        rx={18.5}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={5}
      />
    </svg>
  )
})
