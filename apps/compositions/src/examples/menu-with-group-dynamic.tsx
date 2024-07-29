import { Button } from "compositions/ui/button"
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
      <MenuTrigger>
        <Button variant="outline">Window</Button>
      </MenuTrigger>
      <MenuContent>
        {items.map((item) => (
          <MenuItemGroup title={item.name}>
            {item.children.map((child) => (
              <MenuItem value={child.value}>{child.name}</MenuItem>
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
