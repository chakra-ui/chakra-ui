import { createComponent } from "./create-component"

export const TreeViewAnatomy = createComponent((props) => {
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
      <path
        d="M73 74.5L80 81.5L87 74.5"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={96} y={66} width={24} height={24} rx={5} fill={palette[3]} />
      <rect x={130} y={73} width={110} height={10} rx={5} fill={palette[3]} />
      <path d="M80 92V196" stroke={palette[7]} strokeWidth={3} />
      <path
        d="M105 114.5L112 121.5L119 114.5"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={128} y={106} width={24} height={24} rx={5} fill={palette[3]} />
      <rect x={162} y={113} width={90} height={10} rx={5} fill={palette[3]} />
      <path d="M112 132V196" stroke={palette[7]} strokeWidth={3} />
      <rect x={126} y={142} width={221} height={34} rx={6} fill={palette[5]} />
      <rect x={144} y={147} width={24} height={24} rx={5} fill={palette[15]} />
      <rect x={178} y={154} width={100} height={10} rx={5} fill={palette[15]} />
      <rect x={144} y={184} width={24} height={24} rx={5} fill={palette[2]} />
      <rect x={178} y={191} width={80} height={10} rx={5} fill={palette[2]} />
      <path
        d="M76.5 223L83.5 230L76.5 237"
        stroke={palette[3]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={96} y={218} width={24} height={24} rx={5} fill={palette[3]} />
      <rect x={130} y={225} width={120} height={10} rx={5} fill={palette[3]} />
    </svg>
  )
})
