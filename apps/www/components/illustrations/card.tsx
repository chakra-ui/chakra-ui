import { createComponent } from "./create-component"

export const CardAnatomy = createComponent((props) => {
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
      <rect x={89} y={56} width={222} height={188} rx={8} fill={palette[3]} />
      <rect x={103} y={73} width={195} height={66} fill={palette[7]} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103 164.5C103 162.015 105.015 160 107.5 160H178.5C180.985 160 183 162.015 183 164.5C183 166.985 180.985 169 178.5 169H107.5C105.015 169 103 166.985 103 164.5Z"
        fill={palette[2]}
      />
      <rect x={103} y={183} width={195} height={11} rx={3} fill={palette[15]} />
      <rect x={103} y={208} width={195} height={11} rx={3} fill={palette[15]} />
    </svg>
  )
})
