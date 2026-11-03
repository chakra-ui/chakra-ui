// illustration-ref: tooltip
import { createComponent } from "./create-component"

export const HoverCardAnatomy = createComponent((props) => {
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
      <rect x={100} y={80} width={200} height={90} rx={10} fill={palette[3]} />
      <path
        d="M198.586 178.586C199.367 179.367 200.633 179.367 201.414 178.586L210 170H190L198.586 178.586Z"
        fill={palette[3]}
      />
      <circle cx={134} cy={125} r={16} fill={palette[15]} />
      <rect x={162} y={113} width={110} height={10} rx={5} fill={palette[15]} />
      <rect x={162} y={130} width={70} height={8} rx={4} fill={palette[15]} />
      <rect x={150} y={194} width={100} height={12} rx={6} fill={palette[2]} />
    </svg>
  )
})
