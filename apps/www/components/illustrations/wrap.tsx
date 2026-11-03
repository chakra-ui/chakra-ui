// illustration-ref: flex
import { createComponent } from "./create-component"

export const WrapAnatomy = createComponent((props) => {
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
        opacity={0.34}
        x={70}
        y={96}
        width={261}
        height={119}
        fill={palette[3]}
      />
      <rect x={80} y={106} width={96} height={46} fill={palette[2]} />
      <rect x={186} y={106} width={72} height={46} fill={palette[2]} />
      <rect x={268} y={106} width={53} height={46} fill={palette[2]} />
      <rect x={80} y={162} width={120} height={43} fill={palette[2]} />
    </svg>
  )
})
