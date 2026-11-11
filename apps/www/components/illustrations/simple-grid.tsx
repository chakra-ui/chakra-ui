// illustration-ref: grid
import { createComponent } from "./create-component"

export const SimpleGridAnatomy = createComponent((props) => {
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
      <rect x={70} y={86} width={81} height={60} fill={palette[2]} />
      <rect x={160} y={86} width={81} height={60} fill={palette[2]} />
      <rect x={250} y={86} width={81} height={60} fill={palette[2]} />
      <rect x={70} y={155} width={81} height={60} fill={palette[2]} />
      <rect x={160} y={155} width={81} height={60} fill={palette[2]} />
      <rect x={250} y={155} width={81} height={60} fill={palette[2]} />
    </svg>
  )
})
