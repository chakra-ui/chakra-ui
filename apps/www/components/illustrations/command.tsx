import { createComponent } from "./create-component"

export const CommandAnatomy = createComponent((props) => {
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
      <rect x={60} y={50} width={280} height={200} rx={12} fill={palette[3]} />
      <circle cx={87} cy={77} r={8} stroke={palette[15]} strokeWidth={3} />
      <line
        x1={93}
        y1={83}
        x2={99}
        y2={89}
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <rect x={112} y={72} width={120} height={10} rx={5.0} fill={palette[5]} />
      <rect x={296} y={67} width={28} height={20} rx={4} fill={palette[2]} />
      <line
        x1={60}
        y1={104}
        x2={340}
        y2={104}
        stroke={palette[2]}
        strokeWidth={2}
      />
      <rect x={78} y={124} width={18} height={18} rx={4} fill={palette[15]} />
      <rect
        x={108}
        y={128}
        width={130}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect x={296} y={125} width={26} height={16} rx={4} fill={palette[2]} />
      <rect x={70} y={158} width={260} height={40} rx={6} fill={palette[5]} />
      <rect x={78} y={169} width={18} height={18} rx={4} fill={palette[15]} />
      <rect
        x={108}
        y={173}
        width={100}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect x={296} y={170} width={26} height={16} rx={4} fill={palette[3]} />
      <rect x={78} y={214} width={18} height={18} rx={4} fill={palette[15]} />
      <rect
        x={108}
        y={218}
        width={150}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect x={296} y={215} width={26} height={16} rx={4} fill={palette[2]} />
    </svg>
  )
})
