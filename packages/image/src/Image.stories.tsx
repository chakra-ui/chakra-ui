import * as React from "react"
import { Image } from "."

export default {
  title: "Image",
}

export const BasicExample = () => (
  <Image
    src="https://uinames.com/api/photos/female/7.jpg"
    fallbackSrc="https://via.placeholder.com/240"
  />
)

export const FallbackSrcExample = () => (
  <Image
    // broken link :)
    src="https://uina.com/api/photos/female/7.jpg"
    fallbackSrc="https://via.placeholder.com/240"
  />
)

export const FallbackElementExample = () => (
  <Image
    src="https://uinames.com/api/photos/female/7.jpg"
    fallback={<div style={{ width: 240, height: 240, background: "red" }} />}
  />
)

export const withFit = () => (
  <Image
    src="https://bit.ly/sage-adebayo"
    fallbackSrc="https://via.placeholder.com/240"
    fit="cover"
    width="400px"
    height="300px"
  />
)
