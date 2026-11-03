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
      <rect x={53} y={60} width={294} height={180} rx={10} fill={palette[7]} />
      <path
        d="M53 70C53 64.4772 57.4772 60 63 60H337C342.523 60 347 64.4772 347 70V104H53V70Z"
        fill={palette[3]}
      />
      <rect x={69} y={70} width={24} height={24} rx={4} fill={palette[15]} />
      <rect x={103} y={70} width={24} height={24} rx={4} fill={palette[5]} />
      <rect x={137} y={70} width={24} height={24} rx={4} fill={palette[5]} />
      <rect x={171} y={74} width={3} height={16} fill={palette[5]} />
      <rect x={184} y={70} width={24} height={24} rx={4} fill={palette[5]} />
      <rect x={218} y={70} width={24} height={24} rx={4} fill={palette[5]} />
      <rect x={73} y={126} width={200} height={12} rx={6} fill={palette[3]} />
      <rect x={73} y={152} width={250} height={12} rx={6} fill={palette[2]} />
      <rect x={73} y={178} width={140} height={12} rx={6} fill={palette[2]} />
      <rect x={221} y={174} width={4} height={20} rx={2} fill={palette[3]} />
      <rect x={73} y={204} width={210} height={12} rx={6} fill={palette[2]} />
    </svg>
  )
})
