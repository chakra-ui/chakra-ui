// illustration-ref: icon
import { createComponent } from "./create-component"

export const ThemeAnatomy = createComponent((props) => {
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
      <circle cx={130} cy={150} r={11} fill={palette[2]} />
      <path
        d="M130 126v5M130 169v5M106 150h5M149 150h5M113 133l3.5 3.5M143.5 163.5l3.5 3.5M113 167l3.5-3.5M143.5 136.5l3.5-3.5"
        stroke={palette[2]}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={200} cy={150} r={18} stroke={palette[3]} strokeWidth={4} />
      <path d="M200 132a18 18 0 0 1 0 36z" fill={palette[3]} />
      <path
        d="M288.695 153.162C287.206 153.535 285.716 153.721 284.226 153.721C274.915 153.721 267.466 146.272 267.466 136.96C267.466 135.47 267.652 133.981 268.024 132.491C268.21 131.932 268.024 131.187 267.466 130.629C266.907 130.07 266.348 129.884 265.603 130.07C256.851 132.677 250.705 140.871 250.705 149.996C250.705 161.356 259.83 170.481 271.19 170.481C280.315 170.481 288.509 164.336 290.93 155.397C291.116 154.838 290.93 154.093 290.372 153.535C289.999 153.162 289.254 152.976 288.695 153.162Z"
        fill={palette[3]}
      />
    </svg>
  )
})
