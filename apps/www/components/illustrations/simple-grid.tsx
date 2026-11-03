import { createComponent } from "./create-component"

export const SimpleGridAnatomy = createComponent((props) => {
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
      <rect x={80} y={78} width={72} height={64} rx={8} fill={palette[3]} />
      <rect x={164} y={78} width={72} height={64} rx={8} fill={palette[2]} />
      <rect x={248} y={78} width={72} height={64} rx={8} fill={palette[3]} />
      <rect x={80} y={154} width={72} height={64} rx={8} fill={palette[2]} />
      <rect x={164} y={154} width={72} height={64} rx={8} fill={palette[3]} />
      <rect x={248} y={154} width={72} height={64} rx={8} fill={palette[2]} />
    </svg>
  )
})
