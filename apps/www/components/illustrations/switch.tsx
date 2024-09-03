import { createComponent } from "./create-component"

export const SwitchAnatomy = createComponent((props) => {
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
        x={139}
        y={120}
        width={123}
        height={60}
        rx={29.5}
        fill={palette[5]}
      />
      <circle cx={232} cy={150} r={24} fill={palette[0]} />
    </svg>
  )
})
