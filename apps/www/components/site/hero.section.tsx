"use client"

import { Annoucement } from "@/components/annoucement"
import {
  DemoFrame,
  DemoFrameContent,
  DemoFrameText,
} from "@/components/site/demo-frame"
import { HighlightHeading, Subheading } from "@/components/site/typography"
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Menu,
  Portal,
  Span,
  Stack,
  Tabs,
} from "@chakra-ui/react"
import { PinInput } from "compositions/ui/pin-input"
import { Slider } from "compositions/ui/slider"
import { Switch } from "compositions/ui/switch"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"
import { LuFigma, LuTerminal } from "react-icons/lu"

const tabsData = [
  {
    label: "Chakra",
    content: "Chakra UI is a component library for building web applications.",
  },
  {
    label: "Ark",
    content:
      "Ark UI is a headless library for building reusable, scalable design systems",
  },
  {
    label: "Zag",
    content:
      "Zag.js provides a set of UI components powered by Finite State Machines",
  },
]

const ComponentDemos = () => {
  return (
    <HStack
      gap="4"
      wrap="nowrap"
      overflowX="auto"
      maxW="100%"
      scrollbar="hidden"
      ps="max(24px, calc(50% - 86rem / 2))"
      pe="6"
      overscrollBehaviorInline="contain"
    >
      <DemoFrame id="slider">
        <DemoFrameContent>
          <Slider colorPalette="teal" defaultValue={[40]} size="lg" w="full" />
        </DemoFrameContent>
        <DemoFrameText>Slider</DemoFrameText>
      </DemoFrame>

      <DemoFrame id="pin-input">
        <DemoFrameContent>
          <PinInput size="lg" count={4} />
        </DemoFrameContent>
        <DemoFrameText>Pin Input</DemoFrameText>
      </DemoFrame>

      <DemoFrame id="tabs">
        <DemoFrameContent maxW="80%">
          <Tabs.Root
            fitted
            defaultValue={tabsData[0].label}
            variant="enclosed"
            colorPalette="teal"
            w="full"
          >
            <Tabs.List>
              {tabsData.map((tab, index) => (
                <Tabs.Trigger key={index} value={tab.label}>
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {tabsData.map((tab, index) => (
              <Tabs.Content
                key={index}
                value={tab.label}
                padding="2"
                fontSize="sm"
              >
                {tab.content}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </DemoFrameContent>
        <DemoFrameText>Tabs</DemoFrameText>
      </DemoFrame>

      <DemoFrame id="menu">
        <DemoFrameContent>
          <Menu.Root positioning={{ placement: "bottom" }}>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm">
                Open Menu
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  onKeyDownCapture={(e) => {
                    setTimeout(() => {
                      if (e.key === "Tab" && !e.shiftKey) {
                        document.getElementById("switch")?.focus()
                      } else if (e.key === "Tab" && e.shiftKey) {
                        document.getElementById("menu")?.focus()
                      }
                    }, 0)
                  }}
                >
                  <Menu.Item value="new-txt">New Text File</Menu.Item>
                  <Menu.Item value="new-file">New File...</Menu.Item>
                  <Menu.Item value="new-win">New Window</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </DemoFrameContent>
        <DemoFrameText>Menu</DemoFrameText>
      </DemoFrame>

      <DemoFrame id="switch">
        <DemoFrameContent>
          <Switch size="lg" colorPalette="teal" />
        </DemoFrameContent>
        <DemoFrameText>Switch</DemoFrameText>
      </DemoFrame>
    </HStack>
  )
}

export const HeroSection = () => (
  <Box pt="16" pb="20">
    <Container>
      <Stack gap={{ base: "5", md: "10" }} mb="20">
        <Annoucement alignSelf="flex-start" asChild>
          <Link href="https://www.figma.com/community/file/1506648876941130701">
            <LuFigma />
            [New] Official Figma Kit v3 is Here
            <HiArrowRight />
          </Link>
        </Annoucement>
        <Stack gap="5" pr="4" maxW="3xl" px="1.5">
          <HighlightHeading as="h1" query="with speed">
            Chakra UI is a component system for building products with speed
          </HighlightHeading>
          <Subheading>
            Accessible React components for building high-quality web apps and
            design systems. <Span color="fg">Works with Next.js RSC</Span>
          </Subheading>
        </Stack>

        <Stack direction={{ base: "column", sm: "row" }} gap="3">
          <Button
            size="xl"
            minW="180px"
            asChild
            colorPalette="teal"
            variant="solid"
          >
            <Link href="/docs/get-started/installation">Start Building</Link>
          </Button>
          <Center
            as="pre"
            minH="12"
            shadow="inset"
            bg="bg.subtle/50"
            color={{ _light: "teal.600", _dark: "teal.400" }}
            textStyle="sm"
            fontWeight="semibold"
            ps="4"
            pe="6"
            rounded="l2"
            gap="2.5"
          >
            <LuTerminal />
            npm i @chakra-ui/react
          </Center>
        </Stack>
      </Stack>
    </Container>
    <ComponentDemos />
  </Box>
)
