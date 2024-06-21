import * as Playground from "@/components/playground"
import { Alert } from "@/compositions/ui/alert"
import { Avatar } from "@/compositions/ui/avatar"
import { Button } from "@/compositions/ui/button"
import { CircularProgress } from "@/compositions/ui/circular-progress"
import { EmptyState } from "@/compositions/ui/empty-state"
import { Progress } from "@/compositions/ui/progress"
import { Rating } from "@/compositions/ui/rating"
import { SegmentControl } from "@/compositions/ui/segment-control"
import { Switch } from "@/compositions/ui/switch"
import { Tooltip } from "@/compositions/ui/tooltip"
import {
  Badge,
  Box,
  ColorPalette,
  Container,
  Group,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import { HiColorSwatch, HiPlus } from "react-icons/hi"

const colorPalettes: ColorPalette[] = [
  "gray",
  "red",
  "green",
  "blue",
  "teal",
  "pink",
  "purple",
  "cyan",
  "orange",
  "yellow",
]

const alertStatuses = ["info", "warning", "success", "error"] as const

export default function Page() {
  return (
    <Container py="20" fontSize="sm">
      <Playground.Section>
        <Playground.SectionTitle id="avatar">Avatar</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Avatar
                colorPalette={colorPalette}
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />
              <Avatar colorPalette={colorPalette} name="Segun Adebayo" />
              <Avatar colorPalette={colorPalette} />
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="alert">Alert</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {alertStatuses.map((status) => (
            <Stack
              align="center"
              key={status}
              direction="row"
              gap="10"
              px="4"
              width="full"
            >
              <Text minW="8ch">{status}</Text>
              <Stack flex="1">
                <Alert status={status} title="This is the alert title" />
                <Alert status={status} title="This is the alert title" flex="1">
                  This is the alert description
                </Alert>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="badge">Badge</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
              width="full"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Badge colorPalette={colorPalette} variant="solid">
                New
              </Badge>
              <Badge colorPalette={colorPalette} variant="outline">
                New
              </Badge>
              <Badge colorPalette={colorPalette} variant="subtle">
                New
              </Badge>
              <Badge colorPalette={colorPalette} variant="surface">
                New
              </Badge>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="button">Button</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Button colorPalette={colorPalette}>Button</Button>
              <Button colorPalette={colorPalette} variant="outline">
                Button
              </Button>
              <Button colorPalette={colorPalette} variant="subtle">
                Button
              </Button>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="progress">
          Linear Progress
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Progress
                width="120px"
                defaultValue={40}
                colorPalette={colorPalette}
                variant="outline"
              />
              <Progress
                width="120px"
                defaultValue={40}
                colorPalette={colorPalette}
                variant="subtle"
              />
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="circular-progress">
          Circular Progress
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <CircularProgress
                capIsRound
                size="sm"
                showValue
                value={30}
                colorPalette={colorPalette}
              />
              <CircularProgress
                capIsRound
                size="md"
                showValue
                value={30}
                colorPalette={colorPalette}
              />
              <CircularProgress
                capIsRound
                size="lg"
                showValue
                value={30}
                colorPalette={colorPalette}
              />
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="rating">Rating</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Rating defaultValue={3} size="sm" colorPalette={colorPalette}>
                Button
              </Rating>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="switch">Switch</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Switch colorPalette={colorPalette} />
              <Switch colorPalette={colorPalette} defaultChecked />
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="heading">Heading</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <Heading size="6xl">Heading (6xl)</Heading>
          <Heading size="5xl">Heading (5xl)</Heading>
          <Heading size="4xl">Heading (4xl)</Heading>
          <Heading size="3xl">Heading (3xl)</Heading>
          <Heading size="2xl">Heading (2xl)</Heading>
          <Heading size="xl">Heading (xl)</Heading>
          <Heading size="lg">Heading (lg)</Heading>
          <Heading size="md">Heading (md)</Heading>
          <Heading size="sm">Heading (sm)</Heading>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="segment-control">
          Segment Control
        </Playground.SectionTitle>
        <Stack gap="5" align="flex-start">
          <SegmentControl
            size="sm"
            defaultValue="React"
            items={["React", "Vue", "Solid"]}
          />
          <SegmentControl
            size="md"
            defaultValue="React"
            items={["React", "Vue", "Solid"]}
          />
          <SegmentControl
            size="lg"
            defaultValue="React"
            items={["React", "Vue", "Solid"]}
          />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="empty-state">
          Empty State
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <EmptyState
            icon={<HiColorSwatch />}
            title="Start adding tokens"
            description="Add a new design token to get started"
          >
            <Group>
              <Button startIcon={<HiPlus />}>Add new</Button>
              <Button variant="outline">Import</Button>
            </Group>
          </EmptyState>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="tooltip">Tooltip</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <Tooltip showArrow label="This is the tooltip content">
            <Box
              tabIndex={0}
              userSelect="none"
              bg="bg.subtle"
              borderWidth="1px"
              borderStyle="dashed"
              padding="5"
              rounded="lg"
            >
              Hover me
            </Box>
          </Tooltip>
        </Stack>
      </Playground.Section>
    </Container>
  )
}
