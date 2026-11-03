import { createComponent } from "./create-component"

export const WrapAnatomy = createComponent((props) => {
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
        x={63}
        y={63}
        width={274}
        height={174}
        rx={10}
        stroke={palette[2]}
        strokeWidth={5}
        strokeDasharray="10 10"
      />
      <rect x={85} y={87} width={70} height={34} rx={17} fill={palette[3]} />
      <rect x={167} y={87} width={90} height={34} rx={17} fill={palette[2]} />
      <rect x={269} y={87} width={44} height={34} rx={17} fill={palette[3]} />
      <rect x={85} y={133} width={100} height={34} rx={17} fill={palette[2]} />
      <rect x={197} y={133} width={40} height={34} rx={17} fill={palette[3]} />
      <rect x={249} y={133} width={66} height={34} rx={17} fill={palette[2]} />
      <rect x={85} y={179} width={90} height={34} rx={17} fill={palette[3]} />
      <rect x={187} y={179} width={110} height={34} rx={17} fill={palette[2]} />
    </svg>
  )
})
