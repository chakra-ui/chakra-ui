import { createComponent } from "./create-component"

export const ListboxAnatomy = createComponent((props) => {
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
      <rect x={80} y={56} width={240} height={188} rx={10} fill={palette[3]} />
      <rect x={100} y={79} width={120} height={10} rx={5} fill={palette[15]} />
      <rect x={80} y={106} width={240} height={46} rx={0} fill={palette[2]} />
      <rect x={100} y={124} width={150} height={10} rx={5} fill={palette[15]} />
      <path
        d="M282 129L287.5 135L299 123"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={100} y={171} width={110} height={10} rx={5} fill={palette[15]} />
      <rect x={100} y={215} width={140} height={10} rx={5} fill={palette[15]} />
    </svg>
  )
})
