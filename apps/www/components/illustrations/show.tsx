import { createComponent } from "./create-component"

export const ShowAnatomy = createComponent((props) => {
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
        x={127}
        y={93.9375}
        width={147}
        height={110.438}
        rx={8}
        stroke={palette[2]}
        strokeWidth={6}
        strokeDasharray="9 9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M157.176 207.375H266.8C272.392 207.375 277 202.734 277 197.102V101.211C277 95.5785 272.392 90.9375 266.8 90.9375H242.976L237.929 97.7859H266.8C268.742 97.7859 270.201 99.2548 270.201 101.211V183.08L240.398 150.226C239.711 149.49 238.688 149.086 237.689 149.155C236.829 149.203 235.995 149.594 235.404 150.226L211.071 176.232L194.156 157.19L157.176 207.375ZM206.232 140.802C208.087 141.763 210.185 142.306 212.402 142.306C219.873 142.306 226.002 136.133 226.002 128.608C226.002 124.945 224.55 121.602 222.197 119.136L206.232 140.802Z"
        fill={palette[3]}
      />
      <line
        x1={4}
        y1={-4}
        x2={197.231}
        y2={-4}
        transform="matrix(0.593216 -0.805044 0.802957 0.596037 141 231)"
        stroke={palette[3]}
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  )
})
