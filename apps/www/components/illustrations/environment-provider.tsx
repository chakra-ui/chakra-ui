// illustration-ref: portal
import { createComponent } from "./create-component"

export const EnvironmentProviderAnatomy = createComponent((props) => {
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
        y={70}
        width={200}
        height={160}
        stroke={palette[3]}
        strokeWidth={8}
      />
      <rect x={100} y={70} width={200} height={28} fill={palette[3]} />
      <circle cx={117} cy={84} r={4} fill={palette[15]} />
      <circle cx={131} cy={84} r={4} fill={palette[15]} />
      <rect x={140} y={126} width={120} height={76} fill={palette[2]} />
    </svg>
  )
})
