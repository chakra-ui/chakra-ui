import { createComponent } from "./create-component"

export const ContainerAnatomy = createComponent((props) => {
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
        x={52.5}
        y={62.5}
        width={295}
        height={175}
        rx={8}
        stroke={palette[2]}
        strokeWidth={5}
        strokeDasharray="10 10"
      />
      <rect x={125} y={60} width={150} height={180} fill={palette[3]} />
      <rect x={145} y={84} width={80} height={12} rx={6.0} fill={palette[15]} />
      <rect
        x={145}
        y={112}
        width={110}
        height={10}
        rx={5.0}
        fill={palette[5]}
      />
      <rect x={145} y={132} width={90} height={10} rx={5.0} fill={palette[5]} />
      <rect
        x={145}
        y={152}
        width={105}
        height={10}
        rx={5.0}
        fill={palette[5]}
      />
      <rect x={145} y={178} width={110} height={40} rx={6} fill={palette[2]} />
      <line
        x1={72}
        y1={150}
        x2={105}
        y2={150}
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M79 143L72 150L79 157"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M98 143L105 150L98 157"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1={295}
        y1={150}
        x2={328}
        y2={150}
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M302 143L295 150L302 157"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M321 143L328 150L321 157"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
