// illustration-ref: textarea
import { createComponent } from "./create-component"

export const CodeBlockAnatomy = createComponent((props) => {
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
      <rect x={53} y={90} width={294} height={107} rx={6} fill={palette[3]} />
      <rect x={70} y={110} width={60} height={9} rx={4.5} fill={palette[15]} />
      <rect x={90} y={128} width={130} height={9} rx={4.5} fill={palette[2]} />
      <rect x={90} y={146} width={100} height={9} rx={4.5} fill={palette[2]} />
      <rect x={70} y={164} width={40} height={9} rx={4.5} fill={palette[15]} />
      <path
        d="M319 108h9a2 2 0 0 1 2 2v9M314 113h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z"
        stroke={palette[15]}
        strokeWidth={2}
      />
    </svg>
  )
})
