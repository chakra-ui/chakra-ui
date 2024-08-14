import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "compositions/ui/breadcrumb"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { LuChevronDown } from "react-icons/lu"

export const BreadcrumbWithMenu = () => {
  return (
    <BreadcrumbRoot separator="/" separatorGap="4">
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      <MenuRoot>
        <MenuTrigger asChild>
          <BreadcrumbLink as="button">
            Components <LuChevronDown />
          </BreadcrumbLink>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="theme">Theme</MenuItem>
          <MenuItem value="props">Props</MenuItem>
          <MenuItem value="custom">Customization</MenuItem>
        </MenuContent>
      </MenuRoot>
      <BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
    </BreadcrumbRoot>
  )
}
