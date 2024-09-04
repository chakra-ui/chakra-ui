import { createComponent } from "./create-component"

export const RadioCardAnatomy = createComponent((props) => {
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
      <rect x={70} y={105} width={260} height={90} rx={10} fill={palette[2]} />
      <circle
        cx={105.5}
        cy={150.5}
        r={13}
        fill={palette[15]}
        stroke={palette[3]}
        strokeWidth={9}
      />
      <rect x={143} y={146} width={127} height={9} fill={palette[15]} />
    </svg>
  )
})
