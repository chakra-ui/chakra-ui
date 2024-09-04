import { createComponent } from "./create-component"

export const PortalAnatomy = createComponent((props) => {
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
      <rect
        x={100}
        y={87}
        width={71}
        height={126}
        stroke={palette[3]}
        strokeWidth={8}
        strokeDasharray="11 11"
      />
      <rect x={226} y={82} width={77} height={134} fill={palette[3]} />
      <rect x={165} y={57} width={10} height={186} fill={palette[2]} />
      <rect x={216} y={57} width={10} height={186} fill={palette[2]} />
    </svg>
  )
})
