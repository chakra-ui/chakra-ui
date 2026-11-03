// illustration-ref: textarea
import { createComponent } from "./create-component"

export const RichTextEditorAnatomy = createComponent((props) => {
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
      <rect x={53} y={80} width={294} height={130} rx={6} fill={palette[3]} />
      <path
        d="M70 100h16v16h-16zM94 100h16v16h-16zM118 100h16v16h-16z"
        fill={palette[15]}
      />
      <rect x={70} y={140} width={180} height={9} rx={4.5} fill={palette[15]} />
      <rect x={70} y={163} width={120} height={9} rx={4.5} fill={palette[15]} />
    </svg>
  )
})
