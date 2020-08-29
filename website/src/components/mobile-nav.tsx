import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Box,
  useDisclosure,
  HStack,
  Link,
  Icon,
  Stack,
  Flex,
} from "@chakra-ui/core"
import * as React from "react"
import { MdDehaze } from "react-icons/md"
import useRouteChanged from "hooks/use-route-changed"
import siteConfig from "configs/site-config"
import SponsorButton from "./sponsor-button"
import NavLink from "./header-nav-link"
import { useSidebarRoutesContext } from "hooks/useRoutesContext"
import Sidebar from "components/sidebar/sidebar"
import { DiscordIcon, GithubIcon } from "./icons"

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  useRouteChanged(onClose)
  const { sidebarRoutes } = useSidebarRoutesContext()

  return (
    <>
      <IconButton
        display={{ sm: "inline-flex", md: "none" }}
        aria-label="Open menu"
        fontSize="20px"
        variant="ghost"
        icon={<MdDehaze />}
        onClick={onToggle}
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody pt={3}>
              <Stack px={4} spacing={3}>
                <HStack
                  spacing={5}
                  as="nav"
                  color="gray.400"
                  alignItems="center"
                  justify="space-around"
                >
                  <Link
                    isExternal
                    aria-label="GitHub"
                    href={siteConfig.repo.url}
                  >
                    <Icon
                      as={GithubIcon}
                      transition="color 0.2s"
                      w="5"
                      h="5"
                      _hover={{ color: "gray.600" }}
                    />
                  </Link>
                  <Link
                    isExternal
                    aria-label="Discord"
                    href={siteConfig.discord.url}
                  >
                    <Icon
                      as={DiscordIcon}
                      transition="color 0.2s"
                      w="5"
                      h="5"
                      _hover={{ color: "gray.600" }}
                    />
                  </Link>
                  <SponsorButton />
                </HStack>

                <Stack>
                  <NavLink href="/docs/getting-started">Docs</NavLink>
                  <NavLink href="/guides/integrations/with-cra">Guides</NavLink>
                  <NavLink href="/team">Team</NavLink>
                </Stack>
              </Stack>
              {sidebarRoutes && (
                <Sidebar routes={sidebarRoutes} display="block" />
              )}
            </DrawerBody>
            <DrawerFooter color="gray.400">
              <Flex w="full" alignItems="center" justifyContent="space-evenly">
                <Link isExternal aria-label="GitHub" href={siteConfig.repo.url}>
                  <Icon
                    as={GithubIcon}
                    transition="color 0.2s"
                    w="5"
                    h="5"
                    _hover={{ color: "gray.600" }}
                  />
                </Link>
                <Link
                  isExternal
                  aria-label="Discord"
                  href={siteConfig.discord.url}
                >
                  <Icon
                    as={DiscordIcon}
                    transition="color 0.2s"
                    w="5"
                    h="5"
                    _hover={{ color: "gray.600" }}
                  />
                </Link>
                <SponsorButton />
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
