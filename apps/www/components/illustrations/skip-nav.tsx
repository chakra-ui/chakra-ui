import { createComponent } from "./create-component"

export const SkipNavAnatomy = createComponent((props) => {
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
      <rect x={53} y={55} width={294} height={190} rx={10} fill={palette[7]} />
      <path
        d="M53 65C53 59.4772 57.4772 55 63 55H337C342.523 55 347 59.4772 347 65V99H53V65Z"
        fill={palette[10]}
      />
      <rect x={219} y={72} width={34} height={10} rx={5} fill={palette[5]} />
      <rect x={265} y={72} width={34} height={10} rx={5} fill={palette[5]} />
      <rect x={311} y={72} width={20} height={10} rx={5} fill={palette[5]} />
      <rect
        x={63}
        y={63}
        width={112}
        height={28}
        rx={6}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={3}
      />
      <rect x={77} y={72} width={60} height={10} rx={5} fill={palette[15]} />
      <path
        d="M159 70V84M153 79L159 85L165 79"
        stroke={palette[15]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={73} y={119} width={254} height={106} rx={8} fill={palette[3]} />
      <rect x={93} y={139} width={140} height={14} rx={7} fill={palette[15]} />
      <rect x={93} y={167} width={200} height={10} rx={5} fill={palette[5]} />
      <rect x={93} y={187} width={160} height={10} rx={5} fill={palette[5]} />
    </svg>
  )
})
