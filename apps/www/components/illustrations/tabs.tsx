import { createComponent } from "./create-component"

export const TabsAnatomy = createComponent((props) => {
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
      <rect x={64} y={87} width={123} height={40} rx={8} fill={palette[3]} />
      <rect
        x={90.0908}
        y={102}
        width={70.8182}
        height={10}
        rx={5}
        fill={palette[15]}
      />
      <rect x={203} y={87} width={123} height={40} rx={8} fill={palette[2]} />
      <rect
        x={229.091}
        y={102}
        width={70.8182}
        height={10}
        rx={5}
        fill={palette[3]}
      />
      <rect x={64} y={139} width={262} height={73} rx={5} fill={palette[15]} />
      <path
        d="M80 158C80 155.791 81.7909 154 84 154H302C304.209 154 306 155.791 306 158V158C306 160.209 304.209 162 302 162H84C81.7909 162 80 160.209 80 158V158Z"
        fill={palette[2]}
      />
      <path
        d="M80 179C80 176.791 81.7909 175 84 175H219C221.209 175 223 176.791 223 179V179C223 181.209 221.209 183 219 183H84C81.7909 183 80 181.209 80 179V179Z"
        fill={palette[2]}
      />
    </svg>
  )
})
