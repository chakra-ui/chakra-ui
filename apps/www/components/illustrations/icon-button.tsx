import { createComponent } from "./create-component"

export const IconButtonAnatomy = createComponent((props) => {
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
      <rect x={108} y={106} width={88} height={88} rx={14} fill={palette[3]} />
      <circle cx={148} cy={146} r={16} stroke={palette[15]} strokeWidth={6} />
      <path
        d="M160 158L170 168"
        stroke={palette[15]}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <rect
        x={207}
        y={109}
        width={82}
        height={82}
        rx={12}
        stroke={palette[3]}
        strokeWidth={6}
      />
      <path
        d="M248 130V170M228 150H268"
        stroke={palette[3]}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  )
})
