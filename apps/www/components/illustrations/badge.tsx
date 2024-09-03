import { createComponent } from "./create-component"

export const BadgeAnatomy = createComponent((props) => {
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
      <rect x={129} y={129} width={141} height={41} rx={10} fill={palette[3]} />
      <rect x={158} y={146} width={84} height={8} fill={palette[15]} />
    </svg>
  )
})
