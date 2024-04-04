import { Badge, Wrap } from "../src"
import { DecorativeBox } from "./shared/decorative-box"

export default {
  title: "Layout / Wrap",
}

export const Basic = () => (
  <Wrap gap="2" maxW="200px">
    <Badge>Badge 1</Badge>
    <Badge>Badge 2</Badge>
    <Badge>Badge 3</Badge>
    <Badge>Badge 4</Badge>
  </Wrap>
)

export const Placeholder = () => (
  <Wrap gap="5">
    {Array.from({ length: 12 }).map((_, index) => (
      <DecorativeBox boxSize="12" key={index} />
    ))}
  </Wrap>
)

export const Responsive = () => (
  <Wrap gap={["12px", "24px"]} justify={["center", "flex-start"]}>
    {Array.from({ length: 12 }).map((_, index) => (
      <DecorativeBox boxSize="12" key={index} />
    ))}
  </Wrap>
)
