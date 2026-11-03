import { createComponent } from "./create-component"

export const FloatingPanelAnatomy = createComponent((props) => {
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
      <rect x={56} y={70} width={180} height={10} rx={5} fill={palette[7]} />
      <rect x={56} y={92} width={240} height={10} rx={5} fill={palette[7]} />
      <rect x={56} y={114} width={140} height={10} rx={5} fill={palette[7]} />
      <rect x={116} y={96} width={228} height={150} rx={10} fill={palette[3]} />
      <path
        d="M116 106C116 100.477 120.477 96 126 96H334C339.523 96 344 100.477 344 106V136H116V106Z"
        fill={palette[2]}
      />
      <rect x={134} y={111} width={90} height={10} rx={5} fill={palette[15]} />
      <path
        d="M268 116H280"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect
        x={292}
        y={110}
        width={12}
        height={12}
        rx={2}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <path
        d="M318 110L330 122M330 110L318 122"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect x={134} y={156} width={170} height={10} rx={5} fill={palette[5]} />
      <rect x={134} y={178} width={120} height={10} rx={5} fill={palette[5]} />
      <path
        d="M334 222L320 236M334 232L330 236"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
