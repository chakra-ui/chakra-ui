import { createComponent } from "./create-component"

export const InputAnatomy = createComponent((props) => {
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
        d="M62 134C62 130.686 64.6863 128 68 128H332C335.314 128 338 130.686 338 134V167C338 170.314 335.314 173 332 173H68C64.6863 173 62 170.314 62 167V134Z"
        fill={palette[3]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M80 150.5C80 148.015 82.0147 146 84.5 146H205.5C207.985 146 210 148.015 210 150.5C210 152.985 207.985 155 205.5 155H84.5C82.0147 155 80 152.985 80 150.5Z"
        fill={palette[7]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M218 161C217.448 161 217 160.552 217 160L217 141C217 140.448 217.448 140 218 140C218.552 140 219 140.448 219 141L219 160C219 160.552 218.552 161 218 161Z"
        fill={palette[15]}
      />
    </svg>
  )
})
