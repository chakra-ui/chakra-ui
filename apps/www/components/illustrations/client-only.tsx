import { createComponent } from "./create-component"

export const ClientOnlyAnatomy = createComponent((props) => {
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
        x={62.5}
        y={87.5}
        width={105}
        height={125}
        rx={10}
        stroke={palette[2]}
        strokeWidth={5}
        strokeDasharray="10 9"
      />
      <line
        x1={186}
        y1={150}
        x2={212}
        y2={150}
        stroke={palette[2]}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d="M204 140L215 150L204 160"
        stroke={palette[2]}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={230} y={85} width={110} height={130} rx={10} fill={palette[3]} />
      <circle cx={246} cy={101} r={4} fill={palette[15]} />
      <circle cx={259} cy={101} r={4} fill={palette[15]} />
      <circle cx={272} cy={101} r={4} fill={palette[15]} />
      <line
        x1={230}
        y1={114}
        x2={340}
        y2={114}
        stroke={palette[2]}
        strokeWidth={2}
      />
      <rect
        x={246}
        y={130}
        width={78}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect x={246} y={150} width={58} height={10} rx={5.0} fill={palette[5]} />
      <rect x={246} y={170} width={70} height={10} rx={5.0} fill={palette[5]} />
      <rect x={246} y={190} width={44} height={10} rx={5.0} fill={palette[5]} />
    </svg>
  )
})
