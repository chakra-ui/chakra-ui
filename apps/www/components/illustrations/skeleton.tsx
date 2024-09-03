import { createComponent } from "./create-component"

export const SkeletonAnatomy = createComponent((props) => {
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
      <circle cx={76} cy={90} r={23} fill={palette[3]} />
      <rect x={53} y={131} width={294} height={8} fill={palette[2]} />
      <rect x={53} y={157} width={294} height={8} fill={palette[2]} />
      <rect x={53} y={183} width={294} height={8} fill={palette[2]} />
      <rect x={53} y={209} width={163} height={8} fill={palette[2]} />
    </svg>
  )
})
