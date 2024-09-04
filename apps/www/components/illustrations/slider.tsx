import { createComponent } from "./create-component"

export const SliderAnatomy = createComponent((props) => {
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
        d="M61 151H339"
        stroke={palette[2]}
        strokeWidth={16}
        strokeLinecap="round"
      />
      <line
        x1={61}
        y1={151}
        x2={269}
        y2={151}
        stroke={palette[3]}
        strokeWidth={16}
        strokeLinecap="round"
      />
      <circle
        cx={277}
        cy={150}
        r={19.5}
        fill={palette[3]}
        stroke={palette[15]}
        strokeWidth={5}
      />
    </svg>
  )
})
