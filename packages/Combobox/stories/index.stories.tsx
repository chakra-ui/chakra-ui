import { chakra } from "@chakra-ui/system"
import * as React from "react"

export * from "./combobox.stories"

export default {
  title: "Combobox",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}
