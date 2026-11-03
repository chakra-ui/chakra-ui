// illustration-ref: rating
import { createComponent } from "./create-component"

export const MarqueeAnatomy = createComponent((props) => {
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
      <path
        d="M112 132H116C120.418 132 124 135.582 124 140V160C124 164.418 120.418 168 116 168H112V132Z"
        fill={palette[2]}
      />
      <rect x={136} y={132} width={36} height={36} rx={8} fill={palette[3]} />
      <rect x={182} y={132} width={36} height={36} rx={8} fill={palette[2]} />
      <rect x={228} y={132} width={36} height={36} rx={8} fill={palette[2]} />
      <path
        d="M276 140C276 135.582 279.582 132 284 132H288V168H284C279.582 168 276 164.418 276 160V140Z"
        fill={palette[2]}
      />
    </svg>
  )
})
