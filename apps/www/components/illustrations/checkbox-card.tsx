import { createComponent } from "./create-component"

export const CheckboxCardAnatomy = createComponent((props) => {
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
      <rect x={70} y={105} width={260} height={90} rx={10} fill={palette[2]} />
      <rect x={95} y={146} width={127} height={9} fill={palette[15]} />
      <rect x={273} y={133} width={35} height={35} rx={4} fill={palette[3]} />
      <path
        d="M287.625 154.236L300.082 142L302 143.882L287.625 158L279 149.529L280.916 147.647L287.625 154.236Z"
        fill={palette[0]}
      />
    </svg>
  )
})
