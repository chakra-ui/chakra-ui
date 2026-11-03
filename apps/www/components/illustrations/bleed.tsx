// illustration-ref: prose
import { createComponent } from "./create-component"

export const BleedAnatomy = createComponent((props) => {
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
      <rect x={93} y={80} width={150} height={12} rx={6} fill={palette[2]} />
      <rect x={93} y={106} width={214} height={12} rx={6} fill={palette[2]} />
      <rect x={53} y={134} width={294} height={34} rx={4} fill={palette[3]} />
      <rect x={93} y={184} width={214} height={12} rx={6} fill={palette[2]} />
      <rect x={93} y={210} width={160} height={12} rx={6} fill={palette[2]} />
    </svg>
  )
})
