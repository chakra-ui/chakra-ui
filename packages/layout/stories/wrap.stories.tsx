import * as React from "react"
import { Badge, Wrap, WrapItem } from "../src"

export default {
  title: "Wrap",
}

export const basic = () => (
  <Wrap spacing={["5", "8", "56px"]}>
    <WrapItem>
      <Badge>Badge 1</Badge>
    </WrapItem>
    <WrapItem>
      <Badge>Badge 2</Badge>
    </WrapItem>
    <WrapItem>
      <Badge>Badge 3</Badge>
    </WrapItem>
    <WrapItem>
      <Badge>Badge 4</Badge>
    </WrapItem>
  </Wrap>
)
const Placeholder = (props: any) => (
  <WrapItem>
    <div
      style={{ height: 48, width: props.width || 48, background: "red" }}
      {...props}
    />
  </WrapItem>
)

export const placeholder = () => (
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

export const responsive = () => (
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
