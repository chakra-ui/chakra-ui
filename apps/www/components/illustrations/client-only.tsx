// illustration-ref: portal
import { createComponent } from "./create-component"

export const ClientOnlyAnatomy = createComponent((props) => {
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
        x={100}
        y={87}
        width={71}
        height={126}
        stroke={palette[3]}
        strokeWidth={8}
        strokeDasharray="11 11"
      />
      <rect x={226} y={82} width={77} height={134} fill={palette[3]} />
      <rect x={240} y={98} width={30} height={8} rx={4} fill={palette[15]} />
      <rect x={240} y={116} width={49} height={8} rx={4} fill={palette[15]} />
      <rect x={240} y={134} width={40} height={8} rx={4} fill={palette[15]} />
      <path
        d="M192 140L200 150L192 160"
        stroke={palette[2]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
