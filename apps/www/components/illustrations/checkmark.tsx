import { createComponent } from "./create-component"

export const CheckmarkAnatomy = createComponent((props) => {
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
      <rect x={140} y={90} width={120} height={120} rx={20} fill={palette[3]} />
      <path
        d="M168 152L190 174L232 128"
        stroke={palette[15]}
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
