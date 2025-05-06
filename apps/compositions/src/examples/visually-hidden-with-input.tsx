import { HStack, VisuallyHidden } from "@sh3yk0-ui/react"

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
