// illustration-ref: flex
import { createComponent } from "./create-component"

export const SplitterAnatomy = createComponent((props) => {
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
      <rect x={70} y={90} width={146} height={125} rx={6} fill={palette[2]} />
      <rect x={240} y={90} width={91} height={125} rx={6} fill={palette[2]} />
      <rect x={224} y={134} width={8} height={36} rx={4} fill={palette[3]} />
      <path
        d="M214 72h28M214 72l6-6M214 72l6 6M242 72l-6-6M242 72l-6 6"
        stroke={palette[3]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
