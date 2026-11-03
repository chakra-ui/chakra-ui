// illustration-ref: highlight
import { createComponent } from "./create-component"

export const MarkAnatomy = createComponent((props) => {
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
      <rect x={108} y={140} width={88} height={10} rx={5} fill={palette[3]} />
      <rect x={204} y={127} width={88} height={36} rx={5} fill={palette[2]} />
      <rect x={218} y={140} width={60} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
