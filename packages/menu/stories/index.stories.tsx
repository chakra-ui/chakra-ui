import { chakra } from "@chakra-ui/system"
import React from "react"

export * from "./menu.stories"

export default {
  title: "Components / Overlay / Menu",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}
