import * as React from "react"
import { Image } from "../src"

export default {
  title: "Image",
}

/**
 * The basic usage is very similar to using the
 * `img` tag
 */
export const Basic = () => (
  <Image src="https://bit.ly/dan-abramov" alt="welcome" />
)

/**
 * Chakra has support for fallback images
 * so in event the image falls to load, or while
 * the image is loading, you can show a fallback.
 *
 * NB: we recommend using a local image as fallback
 */
export const FallbackSrcExample = () => (
  <Image
    src="https://bit.ly/dan-abramov"
    fallbackSrc="https://via.placeholder.com/240"
  />
)

/**
 * NEW! You can also pass a fallback component
 * in case you need to show something custom
 */
export const FallbackElementExample = () => (
  <Image
    src="https://bit.ly/dan-abramov"
    fallback={<div style={{ width: 240, height: 240, background: "red" }} />}
  />
)

/**
 * Fit images to their own dimensions by passing
 * `fit` prop which is equivalent to `object-fit`
 * in CSS
 */
export const withFit = () => (
  <Image
    src="https://bit.ly/sage-adebayo"
    fallbackSrc="https://via.placeholder.com/240"
    fit="cover"
    width="400px"
    height="300px"
  />
)

/**
 * Native `img` has support for `width`, and `height` prop,
 * however size those are used as style prop, we added support
 * for `htmlWidth`, and `htmlHeight` to handle this case.
 */
export const withNativeWidth = () => (
  <Image
    src="https://bit.ly/sage-adebayo"
    fallbackSrc="https://via.placeholder.com/240"
    htmlWidth="300px"
    htmlHeight="300px"
    onLoad={() => {
      console.log("loaded")
    }}
  />
)
