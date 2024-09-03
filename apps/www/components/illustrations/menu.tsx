import { createComponent } from "./create-component"

export const MenuAnatomy = createComponent((props) => {
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
      <rect x={53} y={53} width={112} height={45} rx={6} fill={palette[2]} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71 75.5C71 73.0147 73.0147 71 75.5 71H116.5C118.985 71 121 73.0147 121 75.5C121 77.9853 118.985 80 116.5 80H75.5C73.0147 80 71 77.9853 71 75.5Z"
        fill={palette[3]}
      />
      <path
        d="M146.59 72.5898L142 77.1698L137.41 72.5898L136 73.9998L142 79.9998L148 73.9998L146.59 72.5898Z"
        fill={palette[15]}
      />
      <rect x={53} y={111} width={294} height={136} rx={6} fill={palette[3]} />
      <rect x={53} y={158} width={294} height={42} fill={palette[5]} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71 133.5C71 131.015 73.0147 129 75.5 129H206.5C208.985 129 211 131.015 211 133.5C211 135.985 208.985 138 206.5 138H75.5C73.0147 138 71 135.985 71 133.5Z"
        fill={palette[15]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71 178.5C71 176.015 73.0147 174 75.5 174H306.5C308.985 174 311 176.015 311 178.5C311 180.985 308.985 183 306.5 183H75.5C73.0147 183 71 180.985 71 178.5Z"
        fill={palette[15]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71 224.5C71 222.015 73.0147 220 75.5 220H246.5C248.985 220 251 222.015 251 224.5C251 226.985 248.985 229 246.5 229H75.5C73.0147 229 71 226.985 71 224.5Z"
        fill={palette[15]}
      />
    </svg>
  )
})
