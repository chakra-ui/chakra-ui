import { HStack, VisuallyHidden } from "@chakra-ui/react"

export const VisuallyHiddenWithInput = () => {
  return (
    <HStack>
      The input is hidden
      <VisuallyHidden asChild>
        <input type="text" placeholder="Search..." />
      </VisuallyHidden>
    </HStack>
  )
}
