import { createComponent } from "./create-component"

export const FieldsetAnatomy = createComponent((props) => {
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
      <path
        d="M76 72H66C59.3726 72 54 77.3726 54 84V230C54 236.627 59.3726 242 66 242H334C340.627 242 346 236.627 346 230V84C346 77.3726 340.627 72 334 72H186"
        stroke={palette[5]}
        strokeWidth={4}
      />
      <rect x={88} y={66} width={86} height={12} rx={6} fill={palette[3]} />
      <rect x={76} y={98} width={70} height={10} rx={5} fill={palette[5]} />
      <rect x={76} y={116} width={248} height={38} rx={6} fill={palette[3]} />
      <rect x={92} y={131} width={96} height={8} rx={4} fill={palette[7]} />
      <rect x={76} y={170} width={90} height={10} rx={5} fill={palette[5]} />
      <rect x={76} y={188} width={248} height={38} rx={6} fill={palette[3]} />
      <rect x={92} y={203} width={130} height={8} rx={4} fill={palette[7]} />
    </svg>
  )
})
