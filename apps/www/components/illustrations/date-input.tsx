// illustration-ref: pin-input
import { createComponent } from "./create-component"

export const DateInputAnatomy = createComponent((props) => {
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
        x={74}
        y={128}
        width={252}
        height={45}
        rx={6}
        fill={palette[3]}
        opacity={0.7}
      />
      <rect x={94} y={145.5} width={30} height={10} rx={5} fill={palette[15]} />
      <path
        d="M134 157L138 144"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={148}
        y={145.5}
        width={30}
        height={10}
        rx={5}
        fill={palette[15]}
      />
      <path
        d="M188 157L192 144"
        stroke={palette[15]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={202}
        y={145.5}
        width={56}
        height={10}
        rx={5}
        fill={palette[15]}
      />
      <path
        d="M296 144h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2zM294 149h18M299 141v5M307 141v5"
        stroke={palette[15]}
        strokeWidth={2}
      />
    </svg>
  )
})
