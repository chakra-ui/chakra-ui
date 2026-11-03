import { createComponent } from "./create-component"

export const ThemeAnatomy = createComponent((props) => {
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
      <rect x={53} y={70} width={160} height={160} rx={12} fill={palette[10]} />
      <rect x={75} y={94} width={90} height={14} rx={7} fill={palette[3]} />
      <rect x={75} y={122} width={80} height={10} rx={5} fill={palette[5]} />
      <rect x={75} y={142} width={60} height={10} rx={5} fill={palette[5]} />
      <rect x={75} y={186} width={60} height={24} rx={4} fill={palette[3]} />
      <rect
        x={187}
        y={70}
        width={160}
        height={160}
        rx={12}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={4}
      />
      <rect x={209} y={94} width={90} height={14} rx={7} fill={palette[15]} />
      <rect x={209} y={122} width={116} height={10} rx={5} fill={palette[5]} />
      <rect x={209} y={142} width={80} height={10} rx={5} fill={palette[5]} />
      <rect x={209} y={186} width={60} height={24} rx={4} fill={palette[15]} />
      <circle cx={315} cy={102} r={14} fill={palette[15]} />
      <circle cx={322} cy={96} r={12} fill={palette[3]} />
    </svg>
  )
})
