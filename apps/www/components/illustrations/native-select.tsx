// illustration-ref: input
import { createComponent } from "./create-component"

export const NativeSelectAnatomy = createComponent((props) => {
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
      <rect x={62} y={128} width={276} height={45} rx={6} fill={palette[3]} />
      <rect x={80} y={146} width={130} height={9} rx={4.5} fill={palette[15]} />
      <path
        d="M308 147L314 153L320 147"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
