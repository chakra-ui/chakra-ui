import { Flex } from "../src"
import { DecorativeBox } from "./shared/decorative-box"

export default {
  title: "Layout / Flex",
}

export const Vertical = () => (
  <Flex gap="4" direction="column">
    <DecorativeBox height="10">ooooooo</DecorativeBox>
    <DecorativeBox height="10">ahhhhh</DecorativeBox>
    <DecorativeBox height="10">Woah!</DecorativeBox>
  </Flex>
)

export const Horizontal = () => (
  <Flex gap="4">
    <DecorativeBox height="10">ooooooo</DecorativeBox>
    <DecorativeBox height="10">ahhhhh</DecorativeBox>
    <DecorativeBox height="10">Woah!</DecorativeBox>
  </Flex>
)
