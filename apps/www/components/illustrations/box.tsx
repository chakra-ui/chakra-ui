import { createComponent } from "./create-component"

export const BoxAnatomy = createComponent((props) => {
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
        x={126.5}
        y={76.5}
        width={147}
        height={147}
        stroke={palette[3]}
        strokeWidth={5}
        strokeDasharray="10 10"
      />
    </svg>
  )
})
