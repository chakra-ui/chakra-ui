import { createComponent } from "./create-component"

export const TimelineAnatomy = createComponent((props) => {
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
      <line
        x1={128}
        y1={125}
        x2={128}
        y2={167}
        stroke={palette[3]}
        strokeWidth={8}
      />
      <rect x={105} y={175} width={46} height={46} rx={23} fill={palette[3]} />
      <circle cx={128} cy={198} r={10} fill={palette[15]} />
      <rect x={105} y={71} width={46} height={46} rx={23} fill={palette[3]} />
      <path
        d="M118 96L123.781 102.226C124.171 102.646 124.835 102.652 125.234 102.239L138 89"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect x={171} y={85} width={115} height={11} rx={5} fill={palette[2]} />
      <rect x={171} y={193} width={115} height={11} rx={5} fill={palette[2]} />
    </svg>
  )
})
