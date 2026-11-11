// illustration-ref: close-button
import { createComponent } from "./create-component"

export const CheckmarkAnatomy = createComponent((props) => {
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
      <path
        d="M187 151L196.5 160.5L214 141"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
