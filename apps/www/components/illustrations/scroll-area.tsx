import { createComponent } from "./create-component"

export const ScrollAreaAnatomy = createComponent((props) => {
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
      <rect x={83} y={55} width={234} height={190} rx={10} fill={palette[7]} />
      <rect x={105} y={80} width={160} height={12} rx={6} fill={palette[3]} />
      <rect x={105} y={108} width={140} height={12} rx={6} fill={palette[2]} />
      <rect x={105} y={136} width={170} height={12} rx={6} fill={palette[2]} />
      <rect x={105} y={164} width={120} height={12} rx={6} fill={palette[2]} />
      <rect x={105} y={192} width={155} height={12} rx={6} fill={palette[2]} />
      <rect x={105} y={220} width={90} height={12} rx={6} fill={palette[2]} />
      <rect x={293} y={67} width={12} height={166} rx={6} fill={palette[10]} />
      <rect x={293} y={92} width={12} height={64} rx={6} fill={palette[3]} />
    </svg>
  )
})
