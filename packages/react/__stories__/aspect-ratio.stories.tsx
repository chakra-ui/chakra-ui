import { AspectRatioResponsive } from "compositions/examples/aspect-ratio-responsive"
import { AspectRatioWithImage } from "compositions/examples/aspect-ratio-with-image"
import { AspectRatioWithMap } from "compositions/examples/aspect-ratio-with-map"
import { AspectRatioWithVideo } from "compositions/examples/aspect-ratio-with-video"

export default {
  title: "Layout / AspectRatio",
}

export const WithVideo = () => {
  return <AspectRatioWithVideo />
}

export const WithImage = () => {
  return <AspectRatioWithImage />
}

export const WithMap = () => {
  return <AspectRatioWithMap />
}

export const WithResponsive = () => {
  return <AspectRatioResponsive />
}
