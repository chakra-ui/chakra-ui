import { Clipboard, Link } from "@chakra-ui/react"

export const ClipboardWithLink = () => {
  return (
    <Clipboard.Root value="https://chakra-ui.com">
      <Clipboard.Trigger asChild>
        <Link as="span" color="blue.fg" textStyle="sm">
          <Clipboard.Indicator />
          <Clipboard.ValueText />
        </Link>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
