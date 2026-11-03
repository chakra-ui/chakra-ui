import { createComponent } from "./create-component"

export const MarkAnatomy = createComponent((props) => {
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
      <rect x={64} y={88} width={272} height={14} rx={7} fill={palette[7]} />
      <rect x={64} y={143} width={70} height={14} rx={7} fill={palette[7]} />
      <rect x={144} y={130} width={132} height={40} rx={6} fill={palette[3]} />
      <rect x={158} y={143} width={104} height={14} rx={7} fill={palette[15]} />
      <rect x={286} y={143} width={50} height={14} rx={7} fill={palette[7]} />
      <rect x={64} y={198} width={210} height={14} rx={7} fill={palette[7]} />
    </svg>
  )
})
