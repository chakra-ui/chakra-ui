import {
  Button,
  LinkProps,
  Menu,
  MenuItem,
  Portal,
  Span,
} from "@chakra-ui/react"
import Link from "next/link"
import { LuChevronDown } from "react-icons/lu"

interface VersionItem {
  title: string
  value: string
  url: NonNullable<LinkProps["href"]>
}

interface Props {
  items: VersionItem[]
  portalRef?: React.RefObject<HTMLElement | null>
}

export const VersionMenu = (props: Props) => {
  const { items, portalRef } = props
  const [currentItem, ...restItems] = items
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" variant="outline" gap="1" pe="2">
          {currentItem.value}
          <LuChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal container={portalRef}>
        <Menu.Positioner>
          <Menu.Content>
            {restItems.map((item, index) => (
              <MenuItem value={item.value} key={index} asChild>
                <Link href={item.url}>
                  <Span fontWeight="medium" flex="1">
                    {item.title}
                  </Span>
                  <Span color="fg.muted">{item.value}</Span>
                </Link>
              </MenuItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
