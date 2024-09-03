import { createComponent } from "./create-component"

export const SeparatorAnatomy = createComponent((props) => {
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
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 82.5C53 80.0147 55.0147 78 57.5 78H228.5C230.985 78 233 80.0147 233 82.5C233 84.9853 230.985 87 228.5 87H57.5C55.0147 87 53 84.9853 53 82.5Z"
        fill={palette[5]}
      />
      <path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 105.5C53 103.015 55.0147 101 57.5 101H298.5C300.985 101 303 103.015 303 105.5C303 107.985 300.985 110 298.5 110H57.5C55.0147 110 53 107.985 53 105.5Z"
        fill={palette[5]}
      />
      <path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 128.5C53 126.015 55.0147 124 57.5 124H268.5C270.985 124 273 126.015 273 128.5C273 130.985 270.985 133 268.5 133H57.5C55.0147 133 53 130.985 53 128.5Z"
        fill={palette[5]}
      />
      <line
        x1={53}
        y1={161}
        x2={347}
        y2={161}
        stroke={palette[3]}
        strokeWidth={2}
      />
      <path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 195.5C53 193.015 55.0147 191 57.5 191H268.5C270.985 191 273 193.015 273 195.5C273 197.985 270.985 200 268.5 200H57.5C55.0147 200 53 197.985 53 195.5Z"
        fill={palette[5]}
      />
      <path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 218.5C53 216.015 55.0147 214 57.5 214H228.5C230.985 214 233 216.015 233 218.5C233 220.985 230.985 223 228.5 223H57.5C55.0147 223 53 220.985 53 218.5Z"
        fill={palette[5]}
      />
    </svg>
  )
})
