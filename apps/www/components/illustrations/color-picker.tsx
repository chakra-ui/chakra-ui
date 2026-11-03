import { createComponent } from "./create-component"

export const ColorPickerAnatomy = createComponent((props) => {
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
      <rect x={90} y={50} width={220} height={124} rx={10} fill={palette[3]} />
      <circle cx={250} cy={92} r={13} stroke={palette[15]} strokeWidth={5} />
      <rect x={90} y={188} width={38} height={38} rx={8} fill={palette[5]} />
      <rect x={142} y={190} width={168} height={12} rx={6} fill={palette[2]} />
      <circle
        cx={232}
        cy={196}
        r={10}
        fill={palette[15]}
        stroke={palette[3]}
        strokeWidth={3}
      />
      <rect x={142} y={214} width={168} height={12} rx={6} fill={palette[7]} />
      <circle
        cx={282}
        cy={220}
        r={10}
        fill={palette[15]}
        stroke={palette[3]}
        strokeWidth={3}
      />
    </svg>
  )
})
