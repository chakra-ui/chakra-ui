import { createComponent } from "./create-component"

export const ColorSwatchAnatomy = createComponent((props) => {
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
      <rect x={56} y={116} width={56} height={56} rx={10} fill={palette[3]} />
      <rect
        x={127}
        y={107}
        width={74}
        height={74}
        rx={15}
        stroke={palette[3]}
        strokeWidth={4}
      />
      <rect x={136} y={116} width={56} height={56} rx={10} fill={palette[2]} />
      <rect x={216} y={116} width={56} height={56} rx={10} fill={palette[7]} />
      <rect x={296} y={116} width={56} height={56} rx={10} fill={palette[10]} />
    </svg>
  )
})
