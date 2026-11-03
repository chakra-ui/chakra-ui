import { createComponent } from "./create-component"

export const RadiomarkAnatomy = createComponent((props) => {
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
      <circle cx={140} cy={150} r={46} fill={palette[3]} />
      <circle cx={140} cy={150} r={18} fill={palette[15]} />
      <circle cx={260} cy={150} r={42} stroke={palette[2]} strokeWidth={8} />
    </svg>
  )
})
