import { createComponent } from "./create-component"

export const CodeBlockAnatomy = createComponent((props) => {
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
      <rect x={60} y={58} width={280} height={184} rx={12} fill={palette[3]} />
      <rect x={80} y={73} width={80} height={10} rx={5.0} fill={palette[5]} />
      <rect
        x={298}
        y={68}
        width={16}
        height={18}
        rx={3}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <rect
        x={305}
        y={74}
        width={16}
        height={18}
        rx={3}
        stroke={palette[15]}
        strokeWidth={3}
        fill={palette[3]}
      />
      <line
        x1={60}
        y1={99}
        x2={340}
        y2={99}
        stroke={palette[2]}
        strokeWidth={2}
      />
      <rect x={80} y={114} width={10} height={10} rx={5.0} fill={palette[2]} />
      <rect x={80} y={136} width={10} height={10} rx={5.0} fill={palette[2]} />
      <rect x={80} y={158} width={10} height={10} rx={5.0} fill={palette[2]} />
      <rect x={80} y={180} width={10} height={10} rx={5.0} fill={palette[2]} />
      <rect x={80} y={202} width={10} height={10} rx={5.0} fill={palette[2]} />
      <rect x={104} y={114} width={46} height={10} rx={5.0} fill={palette[7]} />
      <rect
        x={156}
        y={114}
        width={90}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect
        x={124}
        y={136}
        width={60}
        height={10}
        rx={5.0}
        fill={palette[10]}
      />
      <rect
        x={190}
        y={136}
        width={100}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect
        x={124}
        y={158}
        width={120}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
      <rect x={124} y={180} width={40} height={10} rx={5.0} fill={palette[7]} />
      <rect
        x={170}
        y={180}
        width={70}
        height={10}
        rx={5.0}
        fill={palette[10]}
      />
      <rect
        x={104}
        y={202}
        width={30}
        height={10}
        rx={5.0}
        fill={palette[15]}
      />
    </svg>
  )
})
