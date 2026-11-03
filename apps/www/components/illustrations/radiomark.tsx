// illustration-ref: radio
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
      <circle cx={150} cy={150} r={30} stroke={palette[2]} strokeWidth={4} />
      <circle
        cx={250}
        cy={150}
        r={26}
        fill={palette[15]}
        stroke={palette[3]}
        strokeWidth={14}
      />
    </svg>
  )
})
