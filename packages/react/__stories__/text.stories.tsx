import { Em, Strong, Text } from "../src"

export default {
  title: "Typography / Text",
}

export const Basic = () => (
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.
  </Text>
)

export const WithStrong = () => (
  <Text>
    <Strong>Lorem ipsum dolor</Strong> sit amet, consectetur adipisicing elit.
    Amet, sapiente.
  </Text>
)

export const WithItalic = () => (
  <Text>
    <Em>Lorem ipsum dolor</Em> sit amet, consectetur adipisicing elit. Amet,
    sapiente.
  </Text>
)
