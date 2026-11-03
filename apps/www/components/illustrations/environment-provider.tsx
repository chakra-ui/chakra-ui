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
      <rect x={80} y={62} width={240} height={176} rx={12} fill={palette[3]} />
      <circle cx={102} cy={84} r={6} fill={palette[15]} />
      <circle cx={122} cy={84} r={6} fill={palette[15]} />
      <circle cx={142} cy={84} r={6} fill={palette[15]} />
      <rect x={96} y={106} width={208} height={116} rx={6} fill={palette[5]} />
      <rect
        x={130}
        y={130}
        width={140}
        height={68}
        rx={6}
        stroke={palette[15]}
        strokeWidth={4}
        strokeDasharray="10 8"
      />
      <rect x={170} y={152} width={60} height={24} rx={5} fill={palette[15]} />
    </svg>
  )
})
