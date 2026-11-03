import { createComponent } from "./create-component"

export const CarouselAnatomy = createComponent((props) => {
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
      <rect x={55} y={85} width={45} height={100} rx={8} fill={palette[2]} />
      <rect x={300} y={85} width={45} height={100} rx={8} fill={palette[2]} />
      <rect x={110} y={65} width={180} height={140} rx={10} fill={palette[3]} />
      <circle cx={110} cy={135} r={17} fill={palette[15]} />
      <circle cx={290} cy={135} r={17} fill={palette[15]} />
      <path
        d="M113 127L105 135L113 143"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M287 127L295 135L287 143"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={168} cy={228} r={6} fill={palette[2]} />
      <rect x={182} y={222} width={36} height={12} rx={6} fill={palette[3]} />
      <circle cx={232} cy={228} r={6} fill={palette[2]} />
    </svg>
  )
})
