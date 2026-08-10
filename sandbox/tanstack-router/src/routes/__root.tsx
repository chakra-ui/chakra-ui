import {
  Box,
  ChakraProvider,
  ClientOnly,
  Flex,
  HStack,
  Skeleton,
  defaultSystem,
} from "@chakra-ui/react"
import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { ThemeProvider } from "next-themes"
import { ColorModeToggle } from "../components/color-mode-toggle"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Box>
          <Flex
            as="nav"
            px="6"
            py="3"
            borderBottomWidth="1px"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack gap="6">
              <Link to="/">
                <img
                  alt="chakra logo"
                  src="/static/logo.svg"
                  width="32"
                  height="32"
                />
              </Link>
              <HStack gap="4" fontWeight="medium">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
              </HStack>
            </HStack>

            <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
              <ColorModeToggle />
            </ClientOnly>
          </Flex>

          <Box p="6">
            <Outlet />
          </Box>

          <TanStackRouterDevtools />
        </Box>
      </ThemeProvider>
    </ChakraProvider>
  )
}
