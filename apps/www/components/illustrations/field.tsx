// illustration-ref: input
import { createComponent } from "./create-component"

export const FieldAnatomy = createComponent((props) => {
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
      <rect x={72} y={114} width={84} height={10} rx={5} fill={palette[3]} />
      <rect x={72} y={136} width={256} height={45} rx={6} fill={palette[3]} />
      <rect x={90} y={154} width={120} height={9} rx={4.5} fill={palette[15]} />
    </svg>
  )
})
