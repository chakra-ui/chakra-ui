import { Badge, BadgeProps, HStack, Stack, StackProps } from "@chakra-ui/react"
import Link, { LinkProps } from "next/link"

interface SideNavItem {
  title: React.ReactNode
  url: LinkProps["href"] | undefined
  external?: boolean
  status?: string
}

interface SideNavProps {
  currentUrl?: string
  title?: React.ReactNode
  status?: string
  items: Array<SideNavItem>
}

const StatusBadge = (props: BadgeProps) => (
  <Badge
    size="xs"
    textStyle="xs"
    variant="solid"
    colorPalette="teal"
    textTransform="capitalize"
    {...props}
  />
)

const SideNavItem = (props: StackProps) => {
  return (
    <HStack
      py="1.5"
      ps="4"
      pe="3"
      rounded="sm"
      color="fg.muted"
      _hover={{
        layerStyle: "fill.subtle",
      }}
      _currentPage={{
        colorPalette: "teal",
        fontWeight: "medium",
        layerStyle: "fill.subtle",
      }}
      {...props}
    />
  )
}

export const SideNav = (props: SideNavProps) => {
  const { title, items, currentUrl, status } = props
  return (
    <Stack gap="2">
      {title && (
        <HStack ps="4" fontWeight="semibold">
          {title}
          {status && <StatusBadge>{status}</StatusBadge>}
        </HStack>
      )}
      <Stack gap="1px">
        {items.map((item, index) => (
          <SideNavItem key={index} asChild>
            {item.external ? (
              <a
                href={item.url as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-current={item.url === currentUrl ? "page" : undefined}
              >
                {item.title}
                {item.status && <StatusBadge>{item.status}</StatusBadge>}
              </a>
            ) : (
              <Link
                href={item.url!}
                aria-current={item.url === currentUrl ? "page" : undefined}
              >
                {item.title}
                {item.status && <StatusBadge>{item.status}</StatusBadge>}
              </Link>
            )}
          </SideNavItem>
        ))}
      </Stack>
    </Stack>
  )
}
