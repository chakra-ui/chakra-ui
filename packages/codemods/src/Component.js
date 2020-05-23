import React from "react"
import { Button } from "@chakra-ui/core"

const Component = ({ props }) => {
  return (
    <>
      <Button variantColor="teal" shadow="lg" size={["12px", "24px"]} />
      <Button variantColor="red" shadow={"sm"} size={"40px"} />
      <Button variantColor="red" shadow={"sm"} size="60px" />
    </>
  )
}

export default Component
