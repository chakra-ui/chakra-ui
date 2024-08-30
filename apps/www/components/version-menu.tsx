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
  title: string
  value: string
  url: NonNullable<LinkProps["href"]>
}

interface Props {
  items: VersionItem[]
  containerRef?: React.RefObject<HTMLElement>
}

export const VersionMenu = (props: Props) => {
  const { items, containerRef } = props
  const [currentItem, ...restItems] = items
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button size="sm" variant="outline" gap="1" pe="2">
          {currentItem.value}
          <LuChevronDown />
        </Button>
      </MenuTrigger>
      <MenuContent portalled containerRef={containerRef}>
        {restItems.map((item, index) => (
          <MenuItem value={item.value} key={index} asChild>
            <Link href={item.url}>
              <Span fontWeight="medium" flex="1">
                {item.title}
              </Span>
              <Span color="fg.subtle">{item.value}</Span>
            </Link>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
