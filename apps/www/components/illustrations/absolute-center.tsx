import { createComponent } from "./create-component"

export const AbsoluteCenterAnatomy = createComponent((props) => {
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
      <rect x={70} y={60} width={260} height={180} rx={10} fill={palette[2]} />
      <rect x={165} y={115} width={70} height={70} rx={8} fill={palette[3]} />
      <line
        x1={84}
        y1={150}
        x2={151}
        y2={150}
        stroke={palette[15]}
        strokeWidth={3}
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      <line
        x1={249}
        y1={150}
        x2={316}
        y2={150}
        stroke={palette[15]}
        strokeWidth={3}
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      <line
        x1={200}
        y1={74}
        x2={200}
        y2={101}
        stroke={palette[15]}
        strokeWidth={3}
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
      <line
        x1={200}
        y1={199}
        x2={200}
        y2={226}
        stroke={palette[15]}
        strokeWidth={3}
        strokeDasharray="6 7"
        strokeLinecap="round"
      />
    </svg>
  )
})
