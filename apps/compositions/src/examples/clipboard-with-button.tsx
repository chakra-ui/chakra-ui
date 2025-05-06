import { Button, Clipboard } from "@sh3yk0-ui/react"

export const ClipboardWithButton = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Trigger asChild>
        <Button variant="surface" size="sm">
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
