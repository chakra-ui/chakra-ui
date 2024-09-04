import { createComponent } from "./create-component"

export const ListAnatomy = createComponent((props) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79 102C79 97.5817 82.5817 94 87 94C91.4183 94 95 97.5817 95 102C95 106.418 91.4183 110 87 110C82.5817 110 79 106.418 79 102Z"
        fill={palette[2]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111 102C111 99.5147 113.015 97.5 115.5 97.5H286.5C288.985 97.5 291 99.5147 291 102C291 104.485 288.985 106.5 286.5 106.5H115.5C113.015 106.5 111 104.485 111 102Z"
        fill={palette[3]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79 134C79 129.582 82.5817 126 87 126C91.4183 126 95 129.582 95 134C95 138.418 91.4183 142 87 142C82.5817 142 79 138.418 79 134Z"
        fill={palette[2]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111 134C111 131.515 113.015 129.5 115.5 129.5H316.5C318.985 129.5 321 131.515 321 134C321 136.485 318.985 138.5 316.5 138.5H115.5C113.015 138.5 111 136.485 111 134Z"
        fill={palette[3]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79 166C79 161.582 82.5817 158 87 158C91.4183 158 95 161.582 95 166C95 170.418 91.4183 174 87 174C82.5817 174 79 170.418 79 166Z"
        fill={palette[2]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111 166C111 163.515 113.015 161.5 115.5 161.5H256.5C258.985 161.5 261 163.515 261 166C261 168.485 258.985 170.5 256.5 170.5H115.5C113.015 170.5 111 168.485 111 166Z"
        fill={palette[3]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79 198C79 193.582 82.5817 190 87 190C91.4183 190 95 193.582 95 198C95 202.418 91.4183 206 87 206C82.5817 206 79 202.418 79 198Z"
        fill={palette[2]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111 198C111 195.515 113.015 193.5 115.5 193.5H276.5C278.985 193.5 281 195.515 281 198C281 200.485 278.985 202.5 276.5 202.5H115.5C113.015 202.5 111 200.485 111 198Z"
        fill={palette[3]}
      />
    </svg>
  )
})
