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
      <rect
        x={28}
        y={112}
        width={52}
        height={56}
        rx={8}
        fill={palette[3]}
        opacity={0.3}
      />
      <rect
        x={96}
        y={112}
        width={56}
        height={56}
        rx={8}
        fill={palette[3]}
        opacity={0.7}
      />
      <rect x={168} y={112} width={64} height={56} rx={8} fill={palette[3]} />
      <rect
        x={248}
        y={112}
        width={56}
        height={56}
        rx={8}
        fill={palette[3]}
        opacity={0.7}
      />
      <rect
        x={320}
        y={112}
        width={52}
        height={56}
        rx={8}
        fill={palette[3]}
        opacity={0.3}
      />
      <path
        d="M240 200H160M160 200L172 190M160 200L172 210"
        stroke={palette[5]}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
