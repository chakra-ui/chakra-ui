import { createComponent } from "./create-component"

export const CollapsibleAnatomy = createComponent((props) => {
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
      <rect x={80} y={60} width={240} height={46} rx={8} fill={palette[2]} />
      <rect x={100} y={78} width={120} height={10} rx={5.0} fill={palette[3]} />
      <path
        d="M290 87L298 79L306 87"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={80} y={118} width={240} height={122} rx={8} fill={palette[3]} />
      <rect
        x={100}
        y={140}
        width={196}
        height={8}
        rx={4.0}
        fill={palette[15]}
      />
      <rect
        x={100}
        y={160}
        width={160}
        height={8}
        rx={4.0}
        fill={palette[15]}
      />
      <rect
        x={100}
        y={180}
        width={180}
        height={8}
        rx={4.0}
        fill={palette[15]}
      />
      <rect
        x={100}
        y={200}
        width={110}
        height={8}
        rx={4.0}
        fill={palette[15]}
      />
    </svg>
  )
})
