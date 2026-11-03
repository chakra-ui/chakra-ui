// illustration-ref: select
import { createComponent } from "./create-component"

export const ComboboxAnatomy = createComponent((props) => {
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
      <rect x={53} y={64} width={294} height={45} rx={6} fill={palette[2]} />
      <rect x={71} y={82} width={80} height={9} rx={4.5} fill={palette[15]} />
      <rect x={158} y={78} width={2} height={17} rx={1} fill={palette[15]} />
      <path
        d="M319 83.5L325 89.5L331 83.5"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={53} y={117} width={294} height={136} rx={6} fill={palette[3]} />
      <rect x={53} y={164} width={294} height={42} fill={palette[2]} />
      <rect x={71} y={135} width={140} height={9} rx={4.5} fill={palette[15]} />
      <rect x={71} y={180} width={240} height={9} rx={4.5} fill={palette[15]} />
      <rect x={71} y={226} width={180} height={9} rx={4.5} fill={palette[15]} />
    </svg>
  )
})
