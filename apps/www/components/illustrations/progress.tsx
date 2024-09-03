import { createComponent } from "./create-component"

export const ProgressAnatomy = createComponent((props) => {
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
      <rect x={101} y={126} width={198} height={11} fill={palette[2]} />
      <rect x={101} y={126} width={166} height={11} fill={palette[3]} />
      <rect x={101} y={163} width={198} height={11} fill={palette[2]} />
      <rect x={101} y={163} width={67} height={11} fill={palette[3]} />
    </svg>
  )
})
