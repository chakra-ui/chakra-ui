import { createComponent } from "./create-component"

export const BlockquoteAnatomy = createComponent((props) => {
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
      <rect x={85} y={112} width={6} height={67} fill={palette[3]} />
      <rect x={108} y={116} width={207} height={10} fill={palette[2]} />
      <rect x={108} y={140} width={207} height={10} fill={palette[2]} />
      <rect x={142} y={164} width={173} height={10} fill={palette[2]} />
      <line x1={107} y1={168.5} x2={131} y2={168.5} stroke={palette[3]} />
    </svg>
  )
})
