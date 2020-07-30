import { chakra } from "@chakra-ui/system"
import * as React from "react"

export * from "./menu.stories"

export default {
  title: "Menu",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}
