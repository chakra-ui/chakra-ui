import { createComponent } from "./create-component"

export const EmAnatomy = createComponent((props) => {
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
      <rect x={64} y={143} width={64} height={14} rx={7} fill={palette[7]} />
      <path d="M148 143H226L221 157H143Z" fill={palette[3]} />
      <path d="M240 143H286L281 157H235Z" fill={palette[3]} />
      <rect x={300} y={143} width={36} height={14} rx={7} fill={palette[7]} />
      <rect x={64} y={198} width={210} height={14} rx={7} fill={palette[7]} />
    </svg>
  )
})
