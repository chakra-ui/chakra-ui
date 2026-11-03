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
        d="M152 102h30v30h-30zM158 108v18h18v-18zM162 112h10v10h-10zM218 102h30v30h-30zM224 108v18h18v-18zM228 112h10v10h-10zM152 168h30v30h-30zM158 174v18h18v-18zM162 178h10v10h-10zM194 104h10v10h-10zM206 116h10v10h-10zM194 128h10v10h-10zM152 144h10v10h-10zM166 150h10v10h-10zM194 146h10v10h-10zM212 140h10v10h-10zM228 146h10v10h-10zM240 158h10v10h-10zM196 166h10v10h-10zM214 172h10v10h-10zM232 180h10v10h-10zM198 188h10v10h-10zM240 190h10v10h-10z"
        fill={palette[3]}
      />
    </svg>
  )
})
