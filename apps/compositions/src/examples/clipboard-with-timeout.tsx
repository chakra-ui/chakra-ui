import { Button, Clipboard } from "@sh3yk0-ui/react"

export const ClipboardWithTimeout = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com" timeout={1000}>
      <Clipboard.Trigger asChild>
        <Button variant="surface" size="sm">
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
