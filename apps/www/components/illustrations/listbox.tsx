// illustration-ref: menu
import { createComponent } from "./create-component"

export const ListboxAnatomy = createComponent((props) => {
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
      <rect x={75} y={65} width={250} height={170} rx={6} fill={palette[3]} />
      <rect x={75} y={129} width={250} height={42} fill={palette[2]} />
      <rect x={97} y={95} width={120} height={10} rx={5} fill={palette[15]} />
      <rect x={97} y={145} width={150} height={10} rx={5} fill={palette[15]} />
      <rect x={97} y={195} width={100} height={10} rx={5} fill={palette[15]} />
      <path
        d="M289 150L296 157L307 144"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
