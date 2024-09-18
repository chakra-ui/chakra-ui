import * as Playground from "@/components/playground"
import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  For,
  HStack,
  Kbd,
  SimpleGrid,
  Stack,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Blockquote } from "compositions/ui/blockquote"
import { Checkbox } from "compositions/ui/checkbox"
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "compositions/ui/progress-circle"
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

  return (
    <Container display="flex" gap="10" maxW="8xl" py="4">
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
                    <HStack colorPalette="accent">
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
              <For each={["outline", "subtle"]}>
                {(variant) => (
                  <Stack key={variant} gap="5">
                    <Checkbox variant={variant}>Accept terms</Checkbox>
                    <Checkbox disabled variant={variant}>
                      Accept terms
                    </Checkbox>
                    <Checkbox defaultChecked variant={variant}>
                      Accept terms
                    </Checkbox>
                    <Checkbox disabled defaultChecked variant={variant}>
                      Accept terms
                    </Checkbox>
                  </Stack>
                )}
              </For>
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="rating">Rating</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="8">
              <Rating defaultValue={3} size="sm" />
              <Rating defaultValue={3} size="sm" colorPalette="accent" />
            </HStack>
          </Playground.SectionContent>
        </Playground.Section>

        <Playground.Section>
          <Playground.SectionTitle id="switch">Switch</Playground.SectionTitle>
          <Playground.SectionContent>
            <HStack wrap="wrap" gap="8">
              <Switch />
              <Switch defaultChecked />
              <Switch defaultChecked colorPalette="accent" />
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
                    dash
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
              <For each={["outline", "subtle"]}>
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
              <ProgressCircleRoot size="md" value={30} colorPalette="accent">
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
      </Box>

      <Box pos="fixed" pt="8" top="20" right="20">
        <ThemePanel
          accentColor={accentColor?.value}
          fontFamily={fontFamily?.value}
        />
      </Box>
    </Container>
  )
}
