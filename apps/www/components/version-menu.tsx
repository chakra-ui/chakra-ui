import { Button, LinkProps, Span } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import Link from "next/link"
import { LuChevronDown } from "react-icons/lu"

interface VersionItem {
  label: string
  value: string
  href: NonNullable<LinkProps["href"]>
}

interface Props {
  items: VersionItem[]
}

export const VersionMenu = (props: Props) => {
  const { items } = props
  const [currentItem, ...restItems] = items
  return (
    <MenuRoot>
      <MenuTrigger alignSelf="flex-start">
        <Button size="sm" variant="outline" gap="1" pe="2">
          {currentItem.value}
          <LuChevronDown />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {restItems.map((item, index) => (
          <MenuItem value={item.value} key={index} asChild>
            <Link href={item.href}>
              <Span fontWeight="medium" flex="1">
                {item.label}
              </Span>
              <Span color="fg.subtle">{item.value}</Span>
            </Link>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
