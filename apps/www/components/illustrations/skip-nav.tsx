// illustration-ref: link
import { createComponent } from "./create-component"

export const SkipNavAnatomy = createComponent((props) => {
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
      <rect
        x={100}
        y={118}
        width={200}
        height={56}
        rx={14}
        stroke={palette[2]}
        strokeWidth={3}
      />
      <rect x={107} y={125} width={186} height={42} rx={8} fill={palette[2]} />
      <rect
        x={127}
        y={141.5}
        width={110}
        height={9}
        rx={4.5}
        fill={palette[0]}
      />
      <path
        d="M266 136v20M259 149l7 7l7-7"
        stroke={palette[0]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
