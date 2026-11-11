// illustration-ref: accordion
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
      <rect x={53} y={78} width={294} height={44} rx={7} fill={palette[3]} />
      <rect x={71} y={94} width={160} height={12} rx={6} fill={palette[15]} />
      <path
        d="M315 103L321 97L327 103"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={53} y={130} width={294} height={92} rx={7} fill={palette[2]} />
      <rect x={71} y={154} width={251} height={8} rx={4} fill={palette[15]} />
      <rect x={71} y={176} width={228} height={8} rx={4} fill={palette[15]} />
      <rect x={71} y={198} width={180} height={8} rx={4} fill={palette[15]} />
    </svg>
  )
})
