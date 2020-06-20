import * as React from "react"
import { Badge, Wrap } from "../src"

export default {
  title: "Wrap",
}

export const basic = () => {
  return (
    <Wrap spacing="40px">
      <Badge>Badge 1</Badge>
      <Badge>Badge 2</Badge>
      <Badge>Badge 3</Badge>
      <Badge>Badge 4</Badge>
    </Wrap>
  )
}
const Placeholder = (props: any) => (
  <div
    style={{ height: 48, width: props.width || 48, background: "red" }}
    {...props}
  />
)

export const placeholder = () => {
  return (
    <Wrap spacing={5}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Wrap>
  )
}

export const responsive = () => {
  return (
    <Wrap spacing={["12px", "24px"]} justify={["center", "flex-start"]}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Wrap>
  )
}
