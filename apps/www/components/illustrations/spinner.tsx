import { createComponent } from "./create-component"

export const SpinnerAnatomy = createComponent((props) => {
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
        d="M195.187 123C209.995 123 222 134.864 222 149.5C222 164.136 209.995 176 195.187 176C188.168 176 181.779 173.335 177 168.973"
        stroke={palette[3]}
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  )
})
