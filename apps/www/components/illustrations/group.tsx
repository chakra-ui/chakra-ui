import { createComponent } from "./create-component"

export const GroupAnatomy = createComponent((props) => {
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
        d="M62 128C62 124.686 64.6863 122 68 122H118V178H68C64.6863 178 62 175.314 62 172V128Z"
        fill={palette[2]}
      />
      <rect x={76} y={145} width={28} height={10} rx={5} fill={palette[15]} />
      <rect x={121} y={122} width={146} height={56} fill={palette[3]} />
      <rect x={137} y={145} width={90} height={10} rx={5} fill={palette[7]} />
      <path
        d="M270 122H332C335.314 122 338 124.686 338 128V172C338 175.314 335.314 178 332 178H270V122Z"
        fill={palette[2]}
      />
      <circle cx={301} cy={147} r={10} stroke={palette[15]} strokeWidth={4} />
      <path
        d="M309 155L316 162"
        stroke={palette[15]}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
})
