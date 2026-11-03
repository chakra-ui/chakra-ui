import { createComponent } from "./create-component"

export const OverlayManagerAnatomy = createComponent((props) => {
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
      <rect x={53} y={50} width={230} height={150} rx={13} fill={palette[7]} />
      <rect x={85} y={75} width={230} height={150} rx={13} fill={palette[5]} />
      <rect
        x={117}
        y={100}
        width={230}
        height={150}
        rx={13}
        fill={palette[3]}
      />
      <rect x={139} y={122} width={120} height={16} rx={8} fill={palette[15]} />
      <rect x={139} y={156} width={180} height={10} rx={5} fill={palette[5]} />
      <rect x={139} y={176} width={130} height={10} rx={5} fill={palette[5]} />
      <rect x={267} y={210} width={58} height={24} rx={4} fill={palette[15]} />
      <path
        d="M316 123L330 137M330 123L316 137"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
