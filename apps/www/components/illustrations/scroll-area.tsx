// illustration-ref: list
import { createComponent } from "./create-component"

export const ScrollAreaAnatomy = createComponent((props) => {
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
      <rect x={79} y={97.5} width={190} height={9} rx={4.5} fill={palette[3]} />
      <rect
        x={79}
        y={129.5}
        width={220}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
      <rect
        x={79}
        y={161.5}
        width={160}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
      <rect
        x={79}
        y={193.5}
        width={200}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
      <rect x={318} y={92} width={8} height={116} rx={4} fill={palette[2]} />
      <rect x={318} y={92} width={8} height={48} rx={4} fill={palette[3]} />
    </svg>
  )
})
