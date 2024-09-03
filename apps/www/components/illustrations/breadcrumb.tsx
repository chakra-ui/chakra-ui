import { createComponent } from "./create-component"

export const BreadcrumbAnatomy = createComponent((props) => {
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
      <rect x={53} y={144} width={71} height={12} rx={6} fill={palette[3]} />
      <rect x={157} y={144} width={74} height={12} rx={6} fill={palette[3]} />
      <rect x={264} y={144} width={83} height={12} rx={6} fill={palette[2]} />
      <path
        d="M144.805 139.205L138.712 161.844H135.323L141.417 139.205H144.805Z"
        fill={palette[2]}
      />
      <path
        d="M251.805 139.205L245.712 161.844H242.323L248.417 139.205H251.805Z"
        fill={palette[2]}
      />
    </svg>
  )
})
