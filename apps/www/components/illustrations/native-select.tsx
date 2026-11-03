import { createComponent } from "./create-component"

export const NativeSelectAnatomy = createComponent((props) => {
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
      <rect x={62} y={122} width={276} height={56} rx={6} fill={palette[3]} />
      <rect x={82} y={145} width={130} height={10} rx={5} fill={palette[15]} />
      <path
        d="M304 146L312 154L320 146"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
