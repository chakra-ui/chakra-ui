// illustration-ref: box
import { createComponent } from "./create-component"

export const ContainerAnatomy = createComponent((props) => {
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
        x={102}
        y={82}
        width={196}
        height={136}
        stroke={palette[3]}
        strokeWidth={4}
        strokeDasharray="10 10"
      />
      <rect
        x={151.5}
        y={101.5}
        width={97}
        height={97}
        stroke={palette[2]}
        strokeWidth={3}
      />
    </svg>
  )
})
