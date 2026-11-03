// illustration-ref: checkbox
import { createComponent } from "./create-component"

export const FieldsetAnatomy = createComponent((props) => {
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
      <path d="M70 92H62V210H338V92H150" stroke={palette[3]} strokeWidth={4} />
      <rect x={80} y={85} width={60} height={14} rx={7} fill={palette[3]} />
      <rect x={84} y={126} width={200} height={14} rx={7} fill={palette[3]} />
      <rect x={84} y={164} width={150} height={14} rx={7} fill={palette[3]} />
    </svg>
  )
})
