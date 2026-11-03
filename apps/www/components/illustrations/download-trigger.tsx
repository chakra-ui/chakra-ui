// illustration-ref: button
import { createComponent } from "./create-component"

export const DownloadTriggerAnatomy = createComponent((props) => {
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
      <rect x={101} y={118} width={198} height={64} rx={12} fill={palette[3]} />
      <path
        d="M148 138V158M139 150L148 159L157 150"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={172} y={142} width={90} height={16} rx={8} fill={palette[2]} />
    </svg>
  )
})
