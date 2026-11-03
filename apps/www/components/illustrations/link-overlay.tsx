// illustration-ref: checkbox-card
import { createComponent } from "./create-component"

export const LinkOverlayAnatomy = createComponent((props) => {
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
      <rect x={95} y={132} width={130} height={12} rx={6} fill={palette[3]} />
      <rect x={95} y={156} width={90} height={9} rx={4.5} fill={palette[15]} />
      <rect x={273} y={133} width={35} height={35} rx={4} fill={palette[3]} />
      <path
        d="M284 157L297 144M287 144H297V154"
        stroke={palette[0]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
