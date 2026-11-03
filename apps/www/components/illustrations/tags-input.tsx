import { createComponent } from "./create-component"

export const TagsInputAnatomy = createComponent((props) => {
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
      <rect x={53} y={116} width={294} height={68} rx={8} fill={palette[7]} />
      <rect x={65} y={128} width={108} height={44} rx={22} fill={palette[3]} />
      <rect x={83} y={145} width={54} height={10} rx={5} fill={palette[15]} />
      <path
        d="M147 144L159 156M159 144L147 156"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect x={183} y={128} width={98} height={44} rx={22} fill={palette[3]} />
      <rect x={201} y={145} width={44} height={10} rx={5} fill={palette[15]} />
      <path
        d="M255 144L267 156M267 144L255 156"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect x={293} y={136} width={4} height={28} rx={2} fill={palette[3]} />
    </svg>
  )
})
