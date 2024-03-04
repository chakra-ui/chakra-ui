import * as React from "react"
import { Image, Img } from "../src/components/image"

export default {
  title: "Media and Icons / Image",
}

export const Basic = () => (
  <Image
    width={["100px", "200px"]}
    src="https://bit.ly/dan-abramov"
    alt="welcome"
  />
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

export const Bug = () => {
  const [src, setSrc] = React.useState("")

  const onClick = () => {
    setSrc(
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    )
  }

  return (
    <div>
      <Image src={src} />
      <button onClick={onClick}>set image</button>
      <p>src set to Avatar: {src}</p>
    </div>
  )
}

export const WithSrcSet = () => {
  const firstRef = React.useRef<HTMLImageElement>(null)
  const secondRef = React.useRef<HTMLImageElement>(null)

  const firstLog = (e: any) => {
    console.log(1, "Image", e.type, firstRef.current?.currentSrc)
  }

  const secondLog = (e: any) => {
    console.log(2, "Img", e.type, secondRef.current?.currentSrc)
  }

  return (
    <>
      <Image
        ref={firstRef}
        srcSet="//fake.image/ 1x"
        onError={firstLog}
        onLoad={firstLog}
      />
      <Img
        ref={secondRef}
        srcSet="//lorempixel.com/100/100/ 1x"
        onError={secondLog}
        onLoad={secondLog}
      />
    </>
  )
}

export const FallbackStrategies = () => {
  return (
    <>
      <Image
        src="https://via.placeholder.com/240"
        w={240}
        h={240}
        fallbackStrategy="onError"
        fallbackSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      />
      <Image
        w={240}
        h={240}
        src="https://via.placeholder.com/240"
        fallbackStrategy="beforeLoadOrError"
        fallbackSrc="https://bit.ly/dan-abramov"
      />
    </>
  )
}
