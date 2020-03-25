import React from "react"
import { Badge, Cluster } from ".."

export default {
  title: "Cluster",
}

export const basic = () => {
  return (
    <Cluster spacing="40px">
      <Badge>Badge 1</Badge>
      <Badge>Badge 2</Badge>
      <Badge>Badge 3</Badge>
      <Badge>Badge 4</Badge>
    </Cluster>
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
    <Cluster spacing={5}>
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
    </Cluster>
  )
}

export const responsive = () => {
  return (
    <Cluster spacing={["12px", "24px"]} justify={["center", "flex-start"]}>
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
    </Cluster>
  )
}
