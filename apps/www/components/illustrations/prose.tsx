import { createComponent } from "./create-component"

export const ProseAnatomy = createComponent((props) => {
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
      <rect x={53} y={74} width={176} height={29} rx={14.5} fill={palette[3]} />
      <rect x={53} y={132} width={294} height={12} rx={6} fill={palette[5]} />
      <rect x={53} y={167} width={294} height={12} rx={6} fill={palette[5]} />
      <rect x={53} y={202} width={294} height={12} rx={6} fill={palette[5]} />
    </svg>
  )
})
