import { createComponent } from "./create-component"

export const TextareaAnatomy = createComponent((props) => {
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
      <rect x={53} y={90} width={294} height={107} rx={6} fill={palette[3]} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70 114.5C70 112.015 72.0147 110 74.5 110H195.5C197.985 110 200 112.015 200 114.5C200 116.985 197.985 119 195.5 119H74.5C72.0147 119 70 116.985 70 114.5Z"
        fill={palette[7]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70 137.5C70 135.015 72.0147 133 74.5 133H245.5C247.985 133 250 135.015 250 137.5C250 139.985 247.985 142 245.5 142H74.5C72.0147 142 70 139.985 70 137.5Z"
        fill={palette[7]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M324.441 204.091C323.546 204.091 323.101 205.176 323.739 205.803L327.298 209.309C327.687 209.692 328.312 209.692 328.702 209.309L332.261 205.803C332.898 205.176 332.454 204.091 331.559 204.091H329.2V189.909H331.559C332.454 189.909 332.898 188.824 332.261 188.197L328.702 184.691C328.312 184.308 327.687 184.308 327.298 184.691L323.739 188.197C323.101 188.824 323.546 189.909 324.441 189.909H326.8V204.091H324.441Z"
        fill={palette[7]}
      />
    </svg>
  )
})
