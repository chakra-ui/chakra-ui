import { useBoolean } from "@chakra-ui/hooks"
import * as React from "react"
import { Slide } from "../src/slide"

export default {
  title: "Transition / Slide",
}

const SlideExample = (props: any) => {
  const [open, { toggle }] = useBoolean(true)
  return (
    <>
      <button onClick={toggle}>Toggle Slide</button>
      <Slide
        style={{
          maxWidth: 400,
          background: "red",
          padding: 30,
        }}
        isOpen={open}
        {...props}
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
      </Slide>
    </>
  )
}

export const Basic = () => <SlideExample />
