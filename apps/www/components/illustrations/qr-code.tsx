// illustration-ref: image
import { createComponent } from "./create-component"

export const QrCodeAnatomy = createComponent((props) => {
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
        d="M152 102h30v30h-30zM158 108v18h18v-18zM162 112h12v12h-12zM218 102h30v30h-30zM224 108v18h18v-18zM228 112h12v12h-12zM152 168h30v30h-30zM158 174v18h18v-18zM162 178h12v12h-12zM194 104h12v12h-12zM206 116h12v12h-12zM194 128h12v12h-12zM152 144h12v12h-12zM166 150h12v12h-12zM194 146h12v12h-12zM212 140h12v12h-12zM228 146h12v12h-12zM240 158h12v12h-12zM196 166h12v12h-12zM214 172h12v12h-12zM232 180h12v12h-12zM198 188h12v12h-12zM240 190h12v12h-12z"
        fill={palette[3]}
        transform="translate(200 150) scale(1.12) translate(-200 -150)"
      />
    </svg>
  )
})
