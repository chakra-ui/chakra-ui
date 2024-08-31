import { Badge, HStack, Stack, Text } from "@chakra-ui/react"
import Link, { LinkProps } from "next/link"

interface SideNavItem {
  title: React.ReactNode
  url: LinkProps["href"]
  status?: string
}

interface SideNavProps {
  currentUrl?: string
  title?: React.ReactNode
  items: Array<SideNavItem>
}

export const SideNav = (props: SideNavProps) => {
  const { title, items, currentUrl } = props
  return (
    <Stack gap="2">
      {title && (
        <Text ps="4" fontWeight="semibold">
          {title}
        </Text>
      )}
      <Stack gap="1px">
        {items.map((item, index) => (
          <HStack
            key={index}
            asChild
            py="1.5"
            ps="4"
            pe="3"
            rounded="sm"
            color="fg.subtle"
            _hover={{
              layerStyle: "fill.subtle",
              colorPalette: "gray",
            }}
            _currentPage={{
              fontWeight: "medium",
              layerStyle: "fill.subtle",
              colorPalette: "gray",
            }}
          >
            <Link
              href={item.url}
              aria-current={item.url === currentUrl ? "page" : undefined}
            >
              {item.title}{" "}
              {item.status && (
                <Badge variant="solid" colorPalette="purple" rounded="full">
                  {item.status}
                </Badge>
              )}
            </Link>
          </HStack>
        ))}
      </Stack>
    </Stack>
  )
}
