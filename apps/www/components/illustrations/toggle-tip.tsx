import { createComponent } from "./create-component"

export const ToggleTipAnatomy = createComponent((props) => {
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
      <rect x={102} y={70} width={196} height={64} rx={10} fill={palette[3]} />
      <rect x={124} y={90} width={120} height={10} rx={5} fill={palette[15]} />
      <rect x={124} y={110} width={152} height={8} rx={4} fill={palette[5]} />
      <path
        d="M190 134H210L201.414 142.586C200.633 143.367 199.367 143.367 198.586 142.586L190 134Z"
        fill={palette[3]}
      />
      <circle cx={200} cy={186} r={28} fill={palette[5]} />
      <circle cx={200} cy={173} r={4.5} fill={palette[15]} />
      <rect x={196} y={182} width={8} height={20} rx={4} fill={palette[15]} />
    </svg>
  )
})
