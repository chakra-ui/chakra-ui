import { OverflowMenu, OverflowMenuItem } from "compositions/ui/overflow-menu"

export const OverflowMenuBasic = () => {
  return (
    <OverflowMenu>
      <OverflowMenuItem value="Banana">Banana</OverflowMenuItem>
      <OverflowMenuItem value="Apple">Apple</OverflowMenuItem>
      <OverflowMenuItem value="Orange">Orange</OverflowMenuItem>
    </OverflowMenu>
  )
}
