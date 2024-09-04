import { createComponent } from "./create-component"

export const RadioAnatomy = createComponent((props) => {
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
      <circle
        cx={128.5}
        cy={177.5}
        r={13}
        fill={palette[15]}
        stroke={palette[3]}
        strokeWidth={9}
      />
      <rect x={161} y={173} width={127} height={9} fill={palette[2]} />
      <circle
        cx={128.5}
        cy={121.5}
        r={15.5}
        stroke={palette[2]}
        strokeWidth={4}
      />
      <rect x={161} y={117} width={127} height={9} fill={palette[2]} />
    </svg>
  )
})
