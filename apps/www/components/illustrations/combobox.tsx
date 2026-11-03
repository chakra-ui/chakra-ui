import { createComponent } from "./create-component"

export const ComboboxAnatomy = createComponent((props) => {
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
      <rect x={53} y={64} width={294} height={45} rx={6} fill={palette[5]} />
      <rect x={71} y={82} width={64} height={9} rx={4.5} fill={palette[3]} />
      <rect x={142} y={76} width={2} height={21} rx={1} fill={palette[15]} />
      <path
        d="M319 82L325 88L331 82"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={53} y={117} width={294} height={136} rx={6} fill={palette[3]} />
      <rect x={53} y={164} width={294} height={42} fill={palette[2]} />
      <rect x={71} y={135} width={64} height={9} rx={4.5} fill={palette[15]} />
      <rect x={141} y={135} width={90} height={9} rx={4.5} fill={palette[5]} />
      <rect x={71} y={180} width={64} height={9} rx={4.5} fill={palette[15]} />
      <rect x={141} y={180} width={150} height={9} rx={4.5} fill={palette[7]} />
      <rect x={71} y={226} width={64} height={9} rx={4.5} fill={palette[15]} />
      <rect x={141} y={226} width={60} height={9} rx={4.5} fill={palette[5]} />
    </svg>
  )
})
