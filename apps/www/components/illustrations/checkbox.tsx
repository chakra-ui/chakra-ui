import { createComponent } from "./create-component"

export const CheckboxAnatomy = createComponent((props) => {
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
      <rect
        x={55}
        y={84}
        width={31}
        height={31}
        fill={palette[5]}
        stroke={palette[8]}
        strokeWidth={4}
      />
      <path d="M80 100H62" stroke={palette[0]} strokeWidth={4} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104 99.5C104 95.0817 108.287 91.5 113.576 91.5H337.424C342.713 91.5 347 95.0817 347 99.5C347 103.918 342.713 107.5 337.424 107.5H113.576C108.287 107.5 104 103.918 104 99.5Z"
        fill={palette[2]}
      />
      <rect
        x={95}
        y={135}
        width={31}
        height={31}
        stroke={palette[8]}
        strokeWidth={4}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M144 150.5C144 146.082 147.582 142.5 152 142.5H339C343.418 142.5 347 146.082 347 150.5C347 154.918 343.418 158.5 339 158.5H152C147.582 158.5 144 154.918 144 150.5Z"
        fill={palette[3]}
      />
      <rect
        x={95}
        y={186}
        width={31}
        height={31}
        fill={palette[5]}
        stroke={palette[8]}
        strokeWidth={4}
      />
      <path
        d="M107.625 205.236L120.082 193L122 194.882L107.625 209L99 200.529L100.916 198.647L107.625 205.236Z"
        fill={palette[0]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M144 201.5C144 197.082 147.582 193.5 152 193.5H339C343.418 193.5 347 197.082 347 201.5C347 205.918 343.418 209.5 339 209.5H152C147.582 209.5 144 205.918 144 201.5Z"
        fill={palette[2]}
      />
    </svg>
  )
})
