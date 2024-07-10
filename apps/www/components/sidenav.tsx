import { Badge, HStack, Stack, StackProps, Text } from "@chakra-ui/react"
import Link, { LinkProps } from "next/link"

interface SideNavItem {
  label: React.ReactNode
  href: LinkProps["href"]
  status?: string
}

interface SideNavProps extends StackProps {
  currentHref?: string
  label?: React.ReactNode
  items: Array<SideNavItem>
}

export const SideNav = (props: SideNavProps) => {
  const { label, items, currentHref, ...rest } = props
  return (
    <Stack gap="4" {...rest}>
      {label && (
        <Text ps="4" fontWeight="semibold">
          {label}
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
            color="fg.muted"
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
              href={item.href}
              aria-current={item.href === currentHref ? "page" : undefined}
            >
              {item.label}{" "}
              {item.status && <Badge variant="solid">{item.status}</Badge>}
            </Link>
          </HStack>
        ))}
      </Stack>
    </Stack>
  )
}
