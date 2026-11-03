// illustration-ref: avatar
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
      <circle cx={148} cy={150.5} r={24} fill={palette[2]} />
      <circle cx={200} cy={150.5} r={24} fill={palette[3]} />
      <circle
        cx={200}
        cy={150.5}
        r={19}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <circle cx={252} cy={150.5} r={24} fill={palette[2]} />
    </svg>
  )
})
