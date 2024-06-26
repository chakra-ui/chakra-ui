import {
  OverflowMenuContent,
  OverflowMenuItem,
  OverflowMenuRoot,
  OverflowMenuTrigger,
} from "compositions/ui/overflow-menu"

export const OverflowMenuBasic = () => {
  return (
    <OverflowMenuRoot>
      <OverflowMenuTrigger />
      <OverflowMenuContent>
        <OverflowMenuItem value="Banana">Banana</OverflowMenuItem>
        <OverflowMenuItem value="Apple">Apple</OverflowMenuItem>
        <OverflowMenuItem value="Orange">Orange</OverflowMenuItem>
      </OverflowMenuContent>
    </OverflowMenuRoot>
  )
}
