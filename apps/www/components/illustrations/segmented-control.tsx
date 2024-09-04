import { createComponent } from "./create-component"

export const SegmentedControlAnatomy = createComponent((props) => {
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
      <rect x={71} y={121} width={258} height={58} rx={9} fill={palette[2]} />
      <rect
        x={227}
        y={145}
        width={70.8182}
        height={10}
        rx={5}
        fill={palette[15]}
      />
      <rect x={80} y={130} width={114} height={40} rx={8} fill={palette[3]} />
      <rect
        x={104.182}
        y={145}
        width={65.6364}
        height={10}
        rx={5}
        fill={palette[15]}
      />
    </svg>
  )
})
