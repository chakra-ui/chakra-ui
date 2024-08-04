"use client"

import {
  Avatar,
  Badge,
  Button,
  Center,
  Circle,
  Container,
  Grid,
  GridItem,
  Group,
  Menu,
  MenuContent,
  MenuItem,
  Portal,
  Progress,
  ProgressCircle,
  RadioGroup,
  SegmentGroup,
  Slider,
  Stack,
  Text,
  Tooltip,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"

const SEGMENT_CONTROL_OPTIONS = [
  {
    title: "Chakra",
    content:
      "Chakra UI is a component system for building products with speed.",
  },
  {
    title: "Ark UI",
    content:
      "Ark UI is an agnostic headless library for building reusable components.",
  },
  {
    title: "Zag.js",
    content:
      "Zag is a framework agnostic toolkit for implementing UI components. ",
  },
]

const HeroShowcaseGrid = chakra(Grid, {
  base: {
    divideStyle: "solid",
    divideColor: "#001B18",
    divideX: { md: "1px" },
    divideY: { md: "1px" },
    gridTemplateColumns: { base: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
    gridTemplateRows: "auto",
    gridTemplateAreas: {
      base: `"buttons buttons"
      "tooltip slider"
      "tooltip slider"
      "tooltip badge"
      "radio badge"
      "radio avatar"
      "radio avatar"
      "progress menu"
      "segment-group segment-group"`,
      md: `"buttons buttons buttons menu" 
      "slider badge avatar menu" 
      "tooltip radio progress segment-group"`,
    },
    "& > :not(:first-child)": {
      "--border-width": "0.5px",
      border: "solid var(--border-width)",
      borderColor: "#001B18",
      ml: "calc(var(--border-width) * -1)",
      mb: "calc(var(--border-width) * -1)",
    },
  },
})

const CTAButtonGroup = () => (
  <GridItem pt="7" area="buttons" px={{ md: "1.5" }} pb={{ mdDown: "6" }}>
    <Stack direction={{ base: "column", sm: "row" }} gap="3">
      <Button
        asChild
        colorPalette="teal"
        size={{ base: "md", md: "lg" }}
        bg="teal.500"
        color="black"
        w={{ base: "full", sm: "fit-content" }}
      >
        <Link href="/docs/get-started/overview/installation">
          Start Building
        </Link>
      </Button>
      <Badge
        variant="plain"
        px={{ base: "4", md: "6" }}
        h={{ base: "10", md: "12" }}
        textStyle={{ base: "sm", md: "md" }}
        rounded={{ base: "md", md: "lg" }}
        border="solid 1px"
        borderColor="border.muted"
        colorPalette="teal"
        bg="transparent"
        fontFamily="mono"
        w={{ base: "full", sm: "fit-content" }}
      >
        npm i @chakra-ui/react
      </Badge>
    </Stack>
  </GridItem>
)

const MenuDemo = () => (
  <GridItem area="menu" borderInlineEndWidth={{ md: "1px!" }}>
    <Center py={{ base: "6", md: "12" }}>
      <Stack gap="4" align="center">
        <Menu.Root open>
          <Button
            variant="ghost"
            border="solid 1px"
            borderColor="border.muted"
            colorPalette="teal"
            size="md"
            bg="transparent"
            color="teal.500"
            w="fit-content"
          >
            Open Menu
          </Button>
          <MenuContent bg="#061416" gap="2.5" asChild>
            <Stack>
              {["New Tab", "New Window...", "Export to HTML"].map((item, i) => (
                <MenuItem
                  key={item}
                  value={item}
                  data-index={i}
                  px="3"
                  minW="40"
                  css={{
                    "&[data-highlighted], [data-part='content']:not([aria-activedescendant]) > &[data-index='1']":
                      {
                        backgroundColor: "whiteAlpha.100",
                        color: "teal.500",
                      },
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Stack>
          </MenuContent>
        </Menu.Root>
      </Stack>
    </Center>
  </GridItem>
)

const SliderDemo = () => (
  <GridItem area="slider" asChild>
    <Center>
      <Slider.Root defaultValue={[70]} colorPalette="teal" w="32" size="lg">
        <Slider.Control>
          <Slider.Track bg="#061416">
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} />
        </Slider.Control>
      </Slider.Root>
    </Center>
  </GridItem>
)

const BadgeDemo = () => (
  <GridItem area="badge" asChild>
    <Center>
      <Badge
        size="lg"
        colorPalette="teal"
        border="solid 0.5px"
        borderColor="border.muted"
        bg="#061416!"
      >
        Badge
      </Badge>
    </Center>
  </GridItem>
)

const AvatarDemo = () => (
  <GridItem area="avatar" asChild>
    <Center>
      <Group gap="0" spaceX="-3">
        <Avatar.Root size="lg">
          <Avatar.Image
            src="https://avatars.githubusercontent.com/u/6916170?v=4"
            alt="Segun Adebayo"
          />
        </Avatar.Root>
        <Avatar.Root size="lg">
          <Avatar.Image
            src="https://avatars.githubusercontent.com/u/30869823?v=4"
            alt="Abraham - anubra266"
          />
        </Avatar.Root>
        <Avatar.Root
          size="lg"
          pos="relative"
          _after={{
            content: '""',
            position: "absolute",
            rounded: "full",
            right: "0",
            bottom: "0",
            bg: "teal.500",
            h: "2",
            w: "2",
          }}
        >
          <Avatar.Image
            src="https://avatars.githubusercontent.com/u/1846056?v=4"
            alt="Chris"
          />
        </Avatar.Root>
      </Group>
    </Center>
  </GridItem>
)

const TooltipDemo = () => (
  <GridItem area="tooltip" borderBottomWidth={{ md: "1px!" }} asChild>
    <Center pb={{ base: "24", md: "12" }} pt={{ mdDown: "12" }}>
      <Tooltip.Root
        unmountOnExit
        defaultOpen
        closeOnScroll={false}
        closeOnPointerDown={false}
      >
        <Tooltip.Trigger asChild>
          <Button variant="outline" size="lg" colorPalette="teal">
            Hover me
          </Button>
        </Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content
              color="fg"
              px="4"
              py="2.5"
              fontWeight="medium"
              fontSize="sm"
              css={{
                "--tooltip-bg": "#061416",
              }}
            >
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              This a chakra tooltip
            </Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    </Center>
  </GridItem>
)

const RadioDemo = () => (
  <GridItem
    area="radio"
    px="6"
    py={{ mdDown: "12" }}
    borderBottomWidth={{ md: "1px!" }}
    asChild
  >
    <Center>
      <RadioGroup.Root
        defaultValue="Standard"
        colorPalette="teal"
        variant="classic"
      >
        <Stack gap="4">
          {["Standard", "Express"].map((item) => (
            <RadioGroup.Item
              value={item}
              key={item}
              border="solid 0.5px"
              borderColor="border.muted"
              px="4"
              py="2.5"
              rounded="sm"
              cursor="pointer"
              _checked={{ bg: "#061416" }}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText fontWeight="medium">
                {item} shipping
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </Stack>
      </RadioGroup.Root>
    </Center>
  </GridItem>
)

const ProgressDemo = () => (
  <GridItem area="progress" borderBottomWidth={{ md: "1px!" }} asChild>
    <Center>
      <Stack gap="7">
        <ProgressCircle.Root value={75} colorPalette="teal">
          <ProgressCircle.ValueText
            fontWeight="medium"
            top="50%"
            left="50%"
            textAlign="center"
            position="absolute"
            transform="translate(-50%, -50%)"
          >
            75%
          </ProgressCircle.ValueText>
          <ProgressCircle.Circle
            css={{
              "--size": "94px",
              "--thickness": "5px",
            }}
          >
            <ProgressCircle.Track stroke="#061416" />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>

        <Progress.Root value={75} colorPalette="teal" size="sm">
          <Progress.Track>
            <Progress.Range borderRadius="sm" />
          </Progress.Track>
        </Progress.Root>
      </Stack>
    </Center>
  </GridItem>
)

const SegmentGroupDemo = () => {
  const [segmentControl, setSegmentControl] = useState("0")

  return (
    <GridItem
      area="segment-group"
      borderInlineEndWidth={{ md: "1px!" }}
      borderBottomWidth={{ md: "1px!" }}
      px="6"
      py="12"
      pos="relative"
    >
      <Circle
        w="426px"
        h="412px"
        pos="absolute"
        top="0"
        right="-5"
        opacity="0.25"
        filter="blur(250px)"
        bg="teal.500"
      />
      <Center>
        <Stack maxW="64" gap="3">
          <SegmentGroup.Root
            value={segmentControl}
            onValueChange={(e) => setSegmentControl(e.value)}
            p="1"
            bg="#061416"
            gap="2.5"
            boxShadow="none"
            h="auto"
          >
            <SegmentGroup.Indicator bg="teal.500" />
            {SEGMENT_CONTROL_OPTIONS.map((item, i) => (
              <SegmentGroup.Item
                key={i}
                value={i.toString()}
                w="full"
                px="3"
                py="2"
                _checked={{
                  color: "black",
                }}
                _before={{ pos: "relative" }}
              >
                <SegmentGroup.ItemText
                  whiteSpace="nowrap"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {item.title}
                </SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
            ))}
          </SegmentGroup.Root>
          <Text fontWeight="medium" fontSize="sm" p="1">
            {SEGMENT_CONTROL_OPTIONS[parseInt(segmentControl)].content}
          </Text>
        </Stack>
      </Center>
    </GridItem>
  )
}

export const HeroShowCase = () => (
  <Container>
    <HeroShowcaseGrid>
      <CTAButtonGroup />
      <MenuDemo />
      <SliderDemo />
      <BadgeDemo />
      <AvatarDemo />
      <TooltipDemo />
      <RadioDemo />
      <ProgressDemo />
      <SegmentGroupDemo />
    </HeroShowcaseGrid>
  </Container>
)
