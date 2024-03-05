import { Meta } from "@storybook/react"
import {
  FaArrowRight,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaSearch,
} from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"
import { BeatLoader } from "react-spinners"
import {
  AbsoluteCenter,
  Container,
  For,
  Group,
  HStack,
  IconButton,
  Span,
  Spinner,
  Stack,
} from "../src"
import { Button } from "../src/components/button"
import { useRecipe } from "../src/styled-system"
import { colorPalettes } from "./shared/color-palettes"
import { DocHeader } from "./shared/doc-header"

export default {
  title: "Form / Button",
  decorators: [
    (Story: any) => (
      <Container mt="40px" display="flex" flexWrap="wrap" gap="4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    children: { type: "string" },
  },
  args: {
    children: "Button",
  },
} satisfies Meta

export const Variants = () => {
  return (
    <Stack spacing="8">
      <DocHeader>
        <span />
        <span>Solid</span>
        <span>Subtle</span>
        <span>Outline</span>
        <span>Ghost</span>
      </DocHeader>
      <Stack spacing="5">
        <For each={colorPalettes}>
          {(c) => (
            <HStack spacing="20">
              <Span fontSize="sm" color="fg.muted" minW="8ch">
                {c}
              </Span>
              <HStack spacing="4">
                <Button colorPalette={c} variant="solid">
                  Next <HiArrowRight />
                </Button>
                <Button colorPalette={c} variant="subtle">
                  Next <HiArrowRight />
                </Button>
                <Button colorPalette={c} variant="outline">
                  Next <HiArrowRight />
                </Button>
                <Button colorPalette={c} variant="ghost">
                  Next <HiArrowRight />
                </Button>
              </HStack>
            </HStack>
          )}
        </For>
      </Stack>
    </Stack>
  )
}

export const Shapes = () => {
  const recipe = useRecipe("Button")
  return (
    <HStack spacing="24px">
      <For each={recipe.variantMap.shape}>
        {(shape) => (
          <Stack spacing="4">
            <Button shape={shape}>Button</Button>
            <Button shape={shape} variant="solid">
              Button
            </Button>
          </Stack>
        )}
      </For>
    </HStack>
  )
}

export const Sizes = () => {
  const recipe = useRecipe("Button")
  return (
    <Stack spacing="24px">
      <DocHeader align="start">
        <For each={recipe.variantMap.size}>{(size) => <Span>{size}</Span>}</For>
      </DocHeader>
      <HStack spacing="4">
        <For each={recipe.variantMap.size}>
          {(size) => (
            <Stack spacing="4">
              <Button colorPalette="blue" size={size}>
                Button
              </Button>
              <Button colorPalette="blue" variant="solid" size={size}>
                Button
              </Button>
            </Stack>
          )}
        </For>
      </HStack>
    </Stack>
  )
}

export const WithIcon = () => (
  <Stack direction="row" spacing={4}>
    <Button colorPalette="teal" variant="solid">
      <FaEnvelope />
      Email
    </Button>
    <Button colorPalette="teal" variant="outline">
      Call us
      <FaArrowRight />
    </Button>
  </Stack>
)

export const WithLoading = () => (
  <Stack direction="row" spacing={4} align="center">
    <Button isDisabled>
      <Spinner boxSize="1em" /> Loading...
    </Button>

    <Button isDisabled variant="solid" colorPalette="blue">
      <AbsoluteCenter>
        <BeatLoader size={8} color="white" />
      </AbsoluteCenter>
      <Span opacity="0">Click me</Span>
    </Button>
  </Stack>
)

export const WithStyleOverrides = () => (
  <Button
    size="md"
    height="48px"
    width="200px"
    border="2px solid"
    borderColor="green.500"
  >
    Button
  </Button>
)

export const WithGroup = () => (
  <Group>
    <Button variant="solid" colorPalette="blue">
      Save
    </Button>
    <Button variant="solid">Cancel</Button>
  </Group>
)

export const WithHorizontalAttached = () => (
  <Group attached>
    <Button size="sm">Save</Button>
    <Button size="sm">Cancel</Button>
    <IconButton size="sm" aria-label="Add to friends">
      <FaChevronDown />
    </IconButton>
  </Group>
)

export const WithVerticalAttached = () => (
  <Group orientation="vertical" attached>
    <Button size="sm">Save</Button>
    <Button size="sm">Cancel</Button>
    <IconButton size="sm" aria-label="Add to friends">
      <FaChevronDown />
    </IconButton>
  </Group>
)

export const _IconButton = () => (
  <Stack direction="row">
    <IconButton aria-label="Search database">
      <FaSearch />
    </IconButton>

    <IconButton colorPalette="blue" aria-label="Search database">
      <FaSearch />
    </IconButton>

    <IconButton colorPalette="teal" aria-label="Call Segun" size="lg">
      <FaPhone />
    </IconButton>
  </Stack>
)
