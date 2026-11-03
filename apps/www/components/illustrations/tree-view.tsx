// illustration-ref: list
import { createComponent } from "./create-component"

export const TreeViewAnatomy = createComponent((props) => {
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
      <path
        d="M80 98l7 7l7-7M84 191l7 7l-7 7M87 116v60"
        stroke={palette[2]}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={103}
        y={97.5}
        width={170}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
      <rect
        x={111}
        y={129.5}
        width={160}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
      <rect
        x={111}
        y={161.5}
        width={120}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
      <rect
        x={103}
        y={193.5}
        width={190}
        height={9}
        rx={4.5}
        fill={palette[3]}
      />
    </svg>
  )
})
