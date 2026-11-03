// illustration-ref: dialog
import { createComponent } from "./create-component"

export const FloatingPanelAnatomy = createComponent((props) => {
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
      <rect x={70} y={66} width={260} height={168} rx={12} fill={palette[2]} />
      <path
        d="M70 78C70 71.3726 75.3726 66 82 66H318C324.627 66 330 71.3726 330 78V106H70V78Z"
        fill={palette[3]}
      />
      <rect x={90} y={80} width={110} height={12} rx={6} fill={palette[15]} />
      <rect x={296} y={84} width={16} height={4} rx={2} fill={palette[15]} />
      <rect x={90} y={130} width={180} height={10} rx={5} fill={palette[15]} />
      <rect x={90} y={154} width={120} height={10} rx={5} fill={palette[15]} />
      <path
        d="M316 210L306 220M316 200L296 220"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  )
})
