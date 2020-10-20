import { useBoolean } from "@chakra-ui/hooks"
import * as React from "react"
import { SlideFade } from "../src/slide-fade"
import { ScaleFade } from "../src/scale-fade"

export default {
  title: "Transition / Offset Slide",
}

export const slideFade = () => {
  const [open, { toggle }] = useBoolean(false)
  return (
    <>
      <button onClick={toggle}>Toggle Slide</button>
      <SlideFade
        in={open}
        offsetY={-8}
        reverse={false}
        style={{
          maxWidth: 400,
          background: "red",
          padding: 30,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </SlideFade>
    </>
  )
}

export const scaleFade = () => {
  const [open, { toggle }] = useBoolean(false)
  return (
    <>
      <button onClick={toggle}>Toggle Scale</button>
      <ScaleFade
        in={open}
        style={{
          maxWidth: 400,
          background: "red",
          padding: 30,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </ScaleFade>
    </>
  )
}
