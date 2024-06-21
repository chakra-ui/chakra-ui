import * as Playground from "@/components/playground"
import { Alert } from "@/compositions/ui/alert"
import { Avatar } from "@/compositions/ui/avatar"
import { CircularProgress } from "@/compositions/ui/circular-progress"
import { Progress } from "@/compositions/ui/progress"
import { Rating } from "@/compositions/ui/rating"
import { Switch } from "@/compositions/ui/switch"
import {
  Badge,
  Button,
  ColorPalette,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react"

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
    </Container>
  )
}
