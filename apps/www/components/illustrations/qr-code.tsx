import { createComponent } from "./create-component"

export const QrCodeAnatomy = createComponent((props) => {
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
      <rect x={120} y={70} width={160} height={160} rx={12} fill={palette[3]} />
      <rect x={134} y={84} width={44} height={44} rx={6} fill={palette[15]} />
      <rect x={142} y={92} width={28} height={28} rx={3} fill={palette[3]} />
      <rect x={148} y={98} width={16} height={16} rx={2} fill={palette[15]} />
      <rect x={222} y={84} width={44} height={44} rx={6} fill={palette[15]} />
      <rect x={230} y={92} width={28} height={28} rx={3} fill={palette[3]} />
      <rect x={236} y={98} width={16} height={16} rx={2} fill={palette[15]} />
      <rect x={134} y={172} width={44} height={44} rx={6} fill={palette[15]} />
      <rect x={142} y={180} width={28} height={28} rx={3} fill={palette[3]} />
      <rect x={148} y={186} width={16} height={16} rx={2} fill={palette[15]} />
      <rect x={186} y={84} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={200} y={98} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={186} y={112} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={186} y={140} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={214} y={140} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={242} y={140} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={158} y={140} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={134} y={140} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={200} y={154} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={228} y={154} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={256} y={154} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={186} y={182} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={214} y={182} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={242} y={196} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={256} y={182} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={200} y={202} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={228} y={202} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={256} y={210} width={14} height={14} rx={2} fill={palette[15]} />
      <rect x={186} y={210} width={14} height={14} rx={2} fill={palette[15]} />
    </svg>
  )
})
