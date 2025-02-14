import { Breadcrumb } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { LuChevronDown } from "react-icons/lu"

export const BreadcrumbWithMenu = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List gap="4">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>

        <Breadcrumb.Item>
          <MenuRoot>
            <MenuTrigger asChild>
              <Breadcrumb.Link as="button">
                Components
                <LuChevronDown />
              </Breadcrumb.Link>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="theme">Theme</MenuItem>
              <MenuItem value="props">Props</MenuItem>
              <MenuItem value="custom">Customization</MenuItem>
            </MenuContent>
          </MenuRoot>
        </Breadcrumb.Item>

        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
