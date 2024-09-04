import { createComponent } from "./create-component"

export const AccordionAnatomy = createComponent((props) => {
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
      <rect x={53} y={78} width={294} height={144} rx={7} fill={palette[2]} />
      <path
        d="M316.41 105.41L321 100.83L325.59 105.41L327 104L321 98.0002L315 104L316.41 105.41Z"
        fill={palette[15]}
      />
      <path
        d="M325.59 194.59L321 199.17L316.41 194.59L315 196L321 202L327 196L325.59 194.59Z"
        fill={palette[15]}
      />
      <rect x={71} y={96} width={216} height={12} rx={6} fill={palette[3]} />
      <rect x={71} y={192} width={216} height={12} rx={6} fill={palette[3]} />
      <rect x={71} y={127} width={251} height={8} rx={4} fill={palette[15]} />
      <rect x={71} y={148} width={228} height={8} rx={4} fill={palette[15]} />
      <line
        opacity={0.5}
        x1={53}
        y1={173.5}
        x2={347}
        y2={173.5}
        stroke={palette[3]}
      />
    </svg>
  )
})
