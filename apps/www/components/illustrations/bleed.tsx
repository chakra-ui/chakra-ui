import { createComponent } from "./create-component"

export const BleedAnatomy = createComponent((props) => {
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
      <rect x={120} y={55} width={160} height={190} rx={6} fill={palette[2]} />
      <rect
        x={140}
        y={76}
        width={110}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect x={140} y={96} width={80} height={10} rx={5.0} fill={palette[15]} />
      <rect x={60} y={125} width={280} height={60} rx={6} fill={palette[3]} />
      <line
        x1={120}
        y1={125}
        x2={120}
        y2={185}
        stroke={palette[7]}
        strokeWidth={3}
        strokeDasharray="5 6"
      />
      <line
        x1={280}
        y1={125}
        x2={280}
        y2={185}
        stroke={palette[7]}
        strokeWidth={3}
        strokeDasharray="5 6"
      />
      <rect
        x={140}
        y={204}
        width={110}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect
        x={140}
        y={224}
        width={70}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
    </svg>
  )
})
