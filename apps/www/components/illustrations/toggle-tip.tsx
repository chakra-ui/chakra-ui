// illustration-ref: tooltip
import { createComponent } from "./create-component"

export const ToggleTipAnatomy = createComponent((props) => {
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
      <rect x={90} y={88} width={220} height={56} rx={8} fill={palette[3]} />
      <rect
        x={130}
        y={113.5}
        width={140}
        height={9}
        rx={4.5}
        fill={palette[15]}
      />
      <path d="M190 142h20l-10 10z" fill={palette[3]} />
      <circle cx={200} cy={184} r={24} fill={palette[3]} />
      <path
        d="M200 170a3 3 0 1 1 0 6a3 3 0 0 1 0-6zM197 180h6v14h-6z"
        fill={palette[15]}
      />
    </svg>
  )
})
