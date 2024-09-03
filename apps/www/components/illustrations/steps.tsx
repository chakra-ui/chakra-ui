import { createComponent } from "./create-component"

export const StepsAnatomy = createComponent((props) => {
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
      <rect x={60} y={127} width={46} height={46} rx={23} fill={palette[3]} />
      <rect x={177} y={127} width={46} height={46} rx={23} fill={palette[3]} />
      <rect x={300} y={127} width={46} height={46} rx={23} fill={palette[2]} />
      <line
        x1={115}
        y1={150}
        x2={167}
        y2={150}
        stroke={palette[2]}
        strokeWidth={8}
      />
      <line
        x1={236}
        y1={150}
        x2={288}
        y2={150}
        stroke={palette[2]}
        strokeWidth={8}
      />
      <circle cx={200} cy={150} r={10} fill={palette[15]} />
      <circle cx={323} cy={150} r={10} fill={palette[15]} />
      <path
        d="M73 152L78.7809 158.226C79.1715 158.646 79.8351 158.652 80.2335 158.239L93 145"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
