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
  useRecipe,
} from "../src"
import { Button } from "../src/components/button"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Button",
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
  const recipe = useRecipe("Button")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <Button variant={v} colorPalette={c}>
                      Next <HiArrowRight />
                    </Button>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useRecipe("Button")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <Button size={v} colorPalette={c}>
                      Next <HiArrowRight />
                    </Button>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
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
