import { For, HStack, IconButton } from "@chakra-ui/react"
import { LuPhone } from "react-icons/lu"

export const IconButtonWithSizes = () => {
  return (
    <HStack wrap="wrap">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <IconButton aria-label="Search database" key={size} size={size}>
            <LuPhone />
          </IconButton>
        )}
      </For>
    </HStack>
  )
}
