// illustration-ref: menu
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
      <rect x={53} y={55} width={294} height={190} rx={8} fill={palette[3]} />
      <path
        d="M78 74a7 7 0 1 1 0 14a7 7 0 1 1 0-14zM83 86l5 5"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <rect x={96} y={76} width={120} height={10} rx={5} fill={palette[2]} />
      <rect x={53} y={104} width={294} height={1} fill={palette[2]} />
      <rect x={71} y={124} width={140} height={9} rx={4.5} fill={palette[15]} />
      <rect x={53} y={152} width={294} height={42} fill={palette[2]} />
      <rect x={71} y={168} width={220} height={9} rx={4.5} fill={palette[15]} />
      <rect x={71} y={214} width={170} height={9} rx={4.5} fill={palette[15]} />
    </svg>
  )
})
