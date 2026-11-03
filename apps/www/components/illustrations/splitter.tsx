import { createComponent } from "./create-component"

export const SplitterAnatomy = createComponent((props) => {
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
      <rect x={53} y={70} width={140} height={160} rx={10} fill={palette[3]} />
      <rect x={213} y={70} width={134} height={160} rx={10} fill={palette[7]} />
      <rect x={198} y={70} width={10} height={160} rx={5} fill={palette[2]} />
      <rect
        x={193}
        y={125}
        width={20}
        height={50}
        rx={6}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <circle cx={203} cy={140} r={2.5} fill={palette[15]} />
      <circle cx={203} cy={150} r={2.5} fill={palette[15]} />
      <circle cx={203} cy={160} r={2.5} fill={palette[15]} />
      <rect x={73} y={92} width={90} height={12} rx={6} fill={palette[15]} />
      <rect x={73} y={116} width={100} height={10} rx={5} fill={palette[5]} />
      <rect x={73} y={134} width={70} height={10} rx={5} fill={palette[5]} />
      <rect x={233} y={92} width={80} height={12} rx={6} fill={palette[3]} />
      <rect x={233} y={116} width={94} height={10} rx={5} fill={palette[2]} />
      <rect x={233} y={134} width={60} height={10} rx={5} fill={palette[2]} />
    </svg>
  )
})
