import { createComponent } from "./create-component"

export const DateInputAnatomy = createComponent((props) => {
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
      <rect x={60} y={84} width={100} height={12} rx={6.0} fill={palette[3]} />
      <rect x={60} y={110} width={280} height={70} rx={10} fill={palette[3]} />
      <rect x={86} y={139} width={50} height={12} rx={6.0} fill={palette[15]} />
      <path
        d="M150 158L160 132"
        stroke={palette[5]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={174} y={128} width={66} height={34} rx={6} fill={palette[15]} />
      <rect x={186} y={139} width={42} height={12} rx={6.0} fill={palette[3]} />
      <path
        d="M254 158L264 132"
        stroke={palette[5]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={278}
        y={139}
        width={40}
        height={12}
        rx={6.0}
        fill={palette[15]}
      />
    </svg>
  )
})
