import * as Playground from "@/components/playground"
import {
  Box,
  Button,
  Code,
  Container,
  For,
  HStack,
  Kbd,
  SimpleGrid,
  Spinner,
  Stack,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@chakra-ui/react"
import { PaginationBasic } from "compositions/examples/pagination-basic"
import { StepsBasic } from "compositions/examples/steps-basic"
import { TimelineBasic } from "compositions/examples/timeline-basic"
import { Avatar } from "compositions/ui/avatar"
import { Blockquote } from "compositions/ui/blockquote"
import { Checkbox } from "compositions/ui/checkbox"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"
import { Radio, RadioGroup } from "compositions/ui/radio"
import { Rating } from "compositions/ui/rating"
import { Slider } from "compositions/ui/slider"
import { Switch } from "compositions/ui/switch"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { LuArrowRight } from "react-icons/lu"
import { ThemePanel } from "./theme-panel"

export const metadata: Metadata = {
  title: "Playground",
  openGraph: {
    images: `/og?title=Playground`,
  },
}

const buttonVariants = [
  "solid",
  "outline",
  "ghost",
  "subtle",
  "surface",
  "plain",
] as const

export default async function Page() {
  const accentColor = cookies().get("chakra-accent-color")
  const fontFamily = cookies().get("chakra-font")
  const radius = cookies().get("chakra-radius")

  return (
    <Container display="flex" gap="10" maxW="8xl">
      <Box
        maxW="5xl"
        width="full"
        flex="1"
        minHeight="var(--content-height)"
        overflow="auto"
      >
        <Playground.Section>
          <Playground.SectionTitle id="button">Button</Playground.SectionTitle>
          <Playground.SectionContent>
            <Playground.DemoList
              items={[
                {
                  label: "Accent Colors",
                  component: (
                    <HStack>
                      <For each={buttonVariants}>
                        {(variant) => (
                          <Button key={variant} variant={variant}>
                            Click <LuArrowRight />
                          </Button>
                        )}
                      </For>
                    </HStack>
                  ),
                },
                {
                  label: "Gray",
                  component: (
                    <HStack colorPalette="gray">
                      <For each={buttonVariants}>
                        {(variant) => (
                          <Button key={variant} variant={variant}>
                            Click <LuArrowRight />
                          </Button>
                        )}
                      </For>
                    </HStack>
                  ),
                },
              ]}
            />
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="code">Code</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="4">
              <For each={["subtle", "surface", "outline", "solid"]}>
                {(variant) => (
                  <Code size="md" variant={variant} key={variant}>
                    console.log()
                  </Code>
                )}
              </For>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="avatar">Avatar</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="4">
              <For each={["subtle", "solid"]}>
                {(variant) => (
                  <HStack key={variant}>
                    <Avatar
                      variant={variant}
                      name="Sage Adebayo"
                      src="https://bit.ly/sage-adebayo"
                      shape="rounded"
                      size="lg"
                    />
                    <Avatar
                      name="Dan Abramov"
                      shape="rounded"
                      size="lg"
                      variant={variant}
                    />
                    <Avatar size="lg" shape="rounded" variant={variant} />
                  </HStack>
                )}
              </For>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="tabs">Tabs</Playground.SectionTitle>
          <Playground.SectionContent>
            <SimpleGrid columns={2} gapX="4" gapY="8">
              <For each={["line", "subtle", "enclosed", "outline"]}>
                {(variant) => (
                  <HStack key={variant}>
                    <TabsRoot variant={variant} defaultValue="components">
                      <TabsList>
                        <TabsTrigger value="components">Components</TabsTrigger>
                        <TabsTrigger value="hooks">Hooks</TabsTrigger>
                        <TabsTrigger value="utilities">Utilities</TabsTrigger>
                      </TabsList>
                    </TabsRoot>
                  </HStack>
                )}
              </For>
            </SimpleGrid>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="checkbox">
            Checkbox
          </Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="8">
              <For each={["solid", "outline", "subtle"]}>
                {(variant) => (
                  <Stack key={variant} gap="5">
                    <Checkbox variant={variant}>Accept terms</Checkbox>
                    <Checkbox defaultChecked variant={variant}>
                      Accept terms
                    </Checkbox>
                  </Stack>
                )}
              </For>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="pagination">
            Pagination
          </Playground.SectionTitle>
          <Playground.SectionContent>
            <PaginationBasic />
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="radio">Radio</Playground.SectionTitle>
          <Playground.SectionContent>
            <Stack wrap="wrap" gap="6">
              <For each={["solid", "outline", "subtle"]}>
                {(variant) => (
                  <RadioGroup
                    defaultValue="two"
                    variant={variant}
                    key={variant}
                  >
                    <HStack gap="5">
                      <Radio value="one">Radio one</Radio>
                      <Radio value="two">Radio second</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              </For>
            </Stack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="rating">Rating</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="8">
              <Rating defaultValue={3} size="sm" />
              <Rating defaultValue={3} size="sm" colorPalette="gray" />
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="switch">Switch</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="8">
              <Switch />
              <Switch defaultChecked />
              <Switch defaultChecked colorPalette="gray" />
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="blockquote">
            Blockquote
          </Playground.SectionTitle>
          <Playground.SectionContent>
            <Stack gap="8">
              <For each={["subtle", "solid"]}>
                {(variant) => (
                  <Blockquote
                    key={variant}
                    showDash
                    cite="Uzumaki Naruto"
                    variant={variant}
                  >
                    If anyone thinks he is something when he is nothing, he
                    deceives himself. Each one should test his own actions. Then
                    he can take pride in himself, without comparing himself to
                    anyone else.
                  </Blockquote>
                )}
              </For>
            </Stack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="slider">Slider</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack gap="8" maxW="400px" w="full">
              <For each={["outline", "solid"]}>
                {(variant) => (
                  <Slider
                    key={variant}
                    flex="1"
                    variant={variant}
                    defaultValue={[50]}
                  />
                )}
              </For>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="progress-circle">
            Progress Circle
          </Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack gap="8" maxW="400px" w="full">
              <ProgressCircleRoot size="md" value={30}>
                <ProgressCircleRing cap="round" />
              </ProgressCircleRoot>
              <ProgressCircleRoot size="md" value={30} colorPalette="gray">
                <ProgressCircleRing cap="round" />
              </ProgressCircleRoot>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="kbd">Kbd</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack gap="4" maxW="400px" w="full">
              <Kbd size="sm">⌘ C</Kbd>
              <Kbd size="md">⌘ C</Kbd>
              <Kbd size="lg">⌘ C</Kbd>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="spinner">
            Spinner
          </Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack gap="8" ps="4">
              <Spinner size="sm" color="colorPalette.solid" />
              <Spinner size="md" color="colorPalette.solid" />
              <Spinner size="lg" color="colorPalette.solid" />
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="steps">Steps</Playground.SectionTitle>
          <Playground.SectionContent>
            <StepsBasic />
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="timeline">
            Timeline
          </Playground.SectionTitle>
          <Playground.SectionContent>
            <TimelineBasic />
          </Playground.SectionContent>
        </Playground.Section>
      </Box>

      <Box w="sm" hideBelow="md" />

      <Box pos="fixed" pt="8" top="24" right="12" hideBelow="md">
        <ThemePanel
          accentColor={accentColor?.value}
          fontFamily={fontFamily?.value}
          radius={radius?.value}
        />
      </Box>
    </Container>
  )
}
