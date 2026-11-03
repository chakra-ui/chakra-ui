import { createComponent } from "./create-component"

export const PresenceAnatomy = createComponent((props) => {
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
        x={55.5}
        y={112.5}
        width={75}
        height={75}
        rx={12}
        stroke={palette[2]}
        strokeWidth={5}
        strokeDasharray="10 10"
      />
      <rect x={162} y={110} width={80} height={80} rx={12} fill={palette[7]} />
      <rect x={273} y={110} width={80} height={80} rx={12} fill={palette[3]} />
      <path
        d="M136 150H154M148 143L155 150L148 157"
        stroke={palette[2]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M247 150H265M259 143L266 150L259 157"
        stroke={palette[2]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
