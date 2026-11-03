// illustration-ref: close-button
import { createComponent } from "./create-component"

export const IconButtonAnatomy = createComponent((props) => {
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
        x={165}
        y={115}
        width={71}
        height={71}
        rx={5.79592}
        fill={palette[3]}
      />
      <circle cx={196} cy={146} r={9} stroke={palette[15]} strokeWidth={4} />
      <path
        d="M203 153L210 160"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
