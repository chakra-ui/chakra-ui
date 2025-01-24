import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

export const MenuWithGroupDynamic = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline">Window</Button>
      </MenuTrigger>
      <MenuContent spaceY="2">
        {items.map((item) => (
          <MenuItemGroup key={item.name} title={item.name}>
            {item.children.map((child) => (
              <MenuItem key={child.value} value={child.value}>
                {child.name}
              </MenuItem>
            ))}
          </MenuItemGroup>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}

const items = [
  {
    name: "Top Panel",
    value: "top",
    children: [
      { value: "5", name: "index.html" },
      { value: "6", name: "styles.css" },
    ],
  },
  {
    name: "Bottom Panel",
    value: "bottom",
    children: [
      { value: "7", name: "script.js" },
      { value: "8", name: "assets" },
    ],
  },
]
