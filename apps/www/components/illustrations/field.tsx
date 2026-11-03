import { createComponent } from "./create-component"

export const FieldAnatomy = createComponent((props) => {
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
      <rect x={62} y={82} width={90} height={12} rx={6} fill={palette[3]} />
      <circle cx={166} cy={88} r={5} fill={palette[3]} />
      <rect x={62} y={108} width={276} height={52} rx={6} fill={palette[3]} />
      <rect x={82} y={129} width={120} height={10} rx={5} fill={palette[7]} />
      <rect x={62} y={178} width={180} height={10} rx={5} fill={palette[5]} />
    </svg>
  )
})
