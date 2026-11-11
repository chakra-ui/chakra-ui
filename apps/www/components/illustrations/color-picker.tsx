// illustration-ref: popover
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
      <rect x={90} y={55} width={220} height={190} rx={8} fill={palette[3]} />
      <rect x={106} y={71} width={188} height={112} rx={4} fill={palette[2]} />
      <circle
        cx={250}
        cy={102}
        r={7}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <rect x={106} y={201} width={188} height={12} rx={6} fill={palette[15]} />
      <circle
        cx={152}
        cy={207}
        r={9}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={3}
      />
    </svg>
  )
})
