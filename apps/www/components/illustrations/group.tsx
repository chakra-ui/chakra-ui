// illustration-ref: segmented-control
import { createComponent } from "./create-component"

export const GroupAnatomy = createComponent((props) => {
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
        d="M80 121H155V179H80C75.0294 179 71 174.971 71 170V130C71 125.029 75.0294 121 80 121Z"
        fill={palette[2]}
      />
      <rect x={158} y={121} width={84} height={58} fill={palette[2]} />
      <path
        d="M245 121H320C324.971 121 329 125.029 329 130V170C329 174.971 324.971 179 320 179H245V121Z"
        fill={palette[2]}
      />
      <rect x={91} y={145} width={44} height={10} rx={5} fill={palette[15]} />
      <rect x={178} y={145} width={44} height={10} rx={5} fill={palette[15]} />
      <rect x={265} y={145} width={44} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
