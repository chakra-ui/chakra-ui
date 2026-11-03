// illustration-ref: center
import { createComponent } from "./create-component"

export const AbsoluteCenterAnatomy = createComponent((props) => {
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
      <rect x={124} y={74} width={152} height={152} fill={palette[2]} />
      <rect x={199} y={74} width={2} height={152} fill={palette[15]} />
      <rect x={124} y={149} width={152} height={2} fill={palette[15]} />
      <rect x={178} y={128} width={44} height={44} rx={4} fill={palette[3]} />
    </svg>
  )
})
