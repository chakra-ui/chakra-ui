import { Clipboard, IconButton } from "@sh3yk0-ui/react"

export const ClipboardBasic = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="xs">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
