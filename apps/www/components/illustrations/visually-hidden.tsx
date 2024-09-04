import { createComponent } from "./create-component"

export const VisuallyHiddenAnatomy = createComponent((props) => {
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
      <rect x={92} y={53} width={171} height={12} rx={6} fill={palette[2]} />
      <rect x={92} y={81} width={136} height={12} rx={6} fill={palette[2]} />
      <rect
        x={93}
        y={110}
        width={213}
        height={80}
        rx={7}
        stroke={palette[3]}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <g clipPath="url(#clip0_1882_128)">
        <path
          d="M175 149.5C175 135.969 185.969 125 199.5 125V125C213.031 125 224 135.969 224 149.5V150.5C224 164.031 213.031 175 199.5 175V175C185.969 175 175 164.031 175 150.5V149.5Z"
          fill={palette[2]}
        />
        <path
          d="M199.5 136.905C200.783 136.905 201.833 138.083 201.833 139.524C201.833 140.964 200.783 142.143 199.5 142.143C198.217 142.143 197.167 140.964 197.167 139.524C197.167 138.083 198.217 136.905 199.5 136.905ZM210 146.071H203V163.095H200.667V155.238H198.333V163.095H196V146.071H189V143.452H210V146.071Z"
          fill={palette[15]}
        />
      </g>
      <rect x={92} y={207} width={136} height={12} rx={6} fill={palette[2]} />
      <rect x={92} y={235} width={169} height={12} rx={6} fill={palette[2]} />
      <defs>
        <clipPath id="clip0_1882_128">
          <rect x={175} y={125} width={49} height={50} fill={palette[0]} />
        </clipPath>
      </defs>
    </svg>
  )
})
