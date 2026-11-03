// illustration-ref: tag
import { createComponent } from "./create-component"

export const TagsInputAnatomy = createComponent((props) => {
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
        x={81.5}
        y={125.5}
        width={237}
        height={49}
        rx={8}
        stroke={palette[2]}
        strokeWidth={3}
      />
      <rect x={92} y={134} width={84} height={32} rx={16} fill={palette[3]} />
      <rect x={184} y={134} width={68} height={32} rx={16} fill={palette[3]} />
      <path
        d="M104 146.5h60a3.5 3.5 0 0 1 0 7h-60a3.5 3.5 0 0 1 0-7zM196 146.5h44a3.5 3.5 0 0 1 0 7h-44a3.5 3.5 0 0 1 0-7z"
        fill={palette[15]}
      />
      <rect x={264} y={138} width={3} height={24} rx={1.5} fill={palette[3]} />
    </svg>
  )
})
