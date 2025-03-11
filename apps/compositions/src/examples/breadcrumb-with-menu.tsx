import { Breadcrumb, Menu, Portal } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"

interface BreadcrumbMenuItemProps {
  children: React.ReactNode
  items: Array<{ label: string; value: string }>
}

const BreadcrumbMenuItem = (props: BreadcrumbMenuItemProps) => {
  const { children, items } = props
  return (
    <Breadcrumb.Item>
      <Menu.Root>
        <Menu.Trigger asChild>{children}</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {items.map((item) => (
                <Menu.Item key={item.value} value={item.value}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Breadcrumb.Item>
  )
}

export const BreadcrumbWithMenu = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List gap="4">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>

        <BreadcrumbMenuItem
          items={[
            { label: "Components", value: "components" },
            { label: "Props", value: "props" },
            { label: "Customization", value: "customization" },
          ]}
        >
          <Breadcrumb.Link as="button">
            Components
            <LuChevronDown />
          </Breadcrumb.Link>
        </BreadcrumbMenuItem>

        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
