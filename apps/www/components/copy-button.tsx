import { Clipboard } from "@ark-ui/react/clipboard"
import { IconButton } from "@chakra-ui/react"
import { LuCheck, LuClipboard } from "react-icons/lu"

interface Props {
  value: string
}

export const CopyButton = (props: Props) => {
  const { value } = props
  return (
    <Clipboard.Root className="dark" value={value}>
      <Clipboard.Trigger asChild>
        <IconButton colorPalette="gray" variant="ghost" size="sm">
          <Clipboard.Indicator copied={<LuCheck />}>
            <LuClipboard />
          </Clipboard.Indicator>
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
