// illustration-ref: show
import { createComponent } from "./create-component"

export const PresenceAnatomy = createComponent((props) => {
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
        x={127}
        y={91}
        width={110}
        height={110}
        rx={8}
        stroke={palette[2]}
        strokeWidth={6}
        strokeDasharray="9 9"
      />
      <rect x={177} y={131} width={100} height={100} rx={8} fill={palette[3]} />
      <rect
        x={197}
        y={176.5}
        width={60}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
    </svg>
  )
})
