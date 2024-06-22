import * as Playground from "@/components/playground"
import {
  Badge,
  Box,
  Card,
  Code,
  ColorPalette,
  Container,
  For,
  Group,
  Heading,
  Prose,
  RadioGroup,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"
import { Avatar } from "compositions/ui/avatar"
import { Blockquote } from "compositions/ui/blockquote"
import { Button } from "compositions/ui/button"
import { Checkbox } from "compositions/ui/checkbox"
import { CircularProgress } from "compositions/ui/circular-progress"
import { EmptyState } from "compositions/ui/empty-state"
import { FileButton } from "compositions/ui/file-button"
import { Pagination, SimplePagination } from "compositions/ui/pagination"
import { Progress } from "compositions/ui/progress"
import { RadioItem } from "compositions/ui/radio-item"
import { Rating } from "compositions/ui/rating"
import { SegmentControl } from "compositions/ui/segment-control"
import { Slider } from "compositions/ui/slider"
import { Status } from "compositions/ui/status"
import { Switch } from "compositions/ui/switch"
import { Tooltip } from "compositions/ui/tooltip"
import { HiColorSwatch, HiPlus, HiUpload } from "react-icons/hi"

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
    <Container py="20" fontSize="sm" maxW="4xl">
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
        <Playground.SectionTitle id="Blockquote">
          Blockquote
        </Playground.SectionTitle>
        <Stack gap="5" align="flex-start">
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
              <Blockquote
                dash
                showIcon
                colorPalette={colorPalette}
                cite="Uzumaki Naruto"
              >
                If anyone thinks he is something when he is nothing, he deceives
                himself. Each one should test his own actions. Then he can take
                pride in himself, without comparing himself to anyone else.
              </Blockquote>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Card">Card</Playground.SectionTitle>
        <Stack direction="row" gap="2" align="flex-start">
          {["subtle", "outline"].map((variant: any) => (
            <Card.Root width="320px" variant={variant} key={variant}>
              <Card.Body>
                <Avatar
                  src="https://picsum.photos/200/300"
                  name="Nue Camp"
                  size="lg"
                  shape="rounded"
                />
                <Heading size="lg" mt="4" mb="2">
                  Nue Camp
                </Heading>
                <Text color="fg.muted">
                  This is the card body. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                  Curabitur nec odio vel dui euismod fermentum.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Group justify="flex-end" width="full">
                  <Button variant="outline">View</Button>
                  <Button>Join</Button>
                </Group>
              </Card.Footer>
            </Card.Root>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="code">Code</Playground.SectionTitle>
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
              <Code colorPalette={colorPalette} variant="solid">
                {`console.log()`}
              </Code>
              <Code colorPalette={colorPalette} variant="outline">
                {`console.log()`}
              </Code>
              <Code colorPalette={colorPalette} variant="subtle">
                {`console.log()`}
              </Code>
              <Code colorPalette={colorPalette} variant="surface">
                {`console.log()`}
              </Code>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Checkbox">
          Checkbox
        </Playground.SectionTitle>
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
              <Stack>
                <Checkbox variant="outline" colorPalette={colorPalette}>
                  Checkbox
                </Checkbox>
                <Checkbox
                  defaultChecked
                  variant="outline"
                  colorPalette={colorPalette}
                >
                  Checkbox
                </Checkbox>
              </Stack>

              <Stack>
                <Checkbox variant="subtle" colorPalette={colorPalette}>
                  Checkbox
                </Checkbox>
                <Checkbox
                  defaultChecked
                  variant="subtle"
                  colorPalette={colorPalette}
                >
                  Checkbox
                </Checkbox>
              </Stack>
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
        <Playground.SectionTitle id="Pagination">
          Pagination
        </Playground.SectionTitle>
        <Stack gap="5" align="flex-start">
          <Pagination count={100} pageSize={10} />
          <SimplePagination showPageText count={100} pageSize={10} />
          <SimplePagination count={100} pageSize={10} />
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
        <Playground.SectionTitle id="radio">
          Radio Group
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
              <RadioGroup.Root
                colorPalette={colorPalette}
                defaultValue="react"
                spaceX="8"
              >
                <RadioItem value="react">React</RadioItem>
                <RadioItem value="vue">Vue</RadioItem>
                <RadioItem value="solid">Solid</RadioItem>
              </RadioGroup.Root>
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
        <Playground.SectionTitle id="Spinner">Spinner</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Spinner
                size="sm"
                color="colorPalette.600"
                colorPalette={colorPalette}
              />
              <Spinner
                size="md"
                color="colorPalette.600"
                colorPalette={colorPalette}
              />
              <Spinner
                size="lg"
                color="colorPalette.600"
                colorPalette={colorPalette}
              />
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Status">Status</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <Stack align="center" direction="row" gap="10" px="4">
            <For each={["sm", "md", "lg"]}>
              {(size) => (
                <Status size={size} width="100px" value="warning">
                  In Review
                </Status>
              )}
            </For>
          </Stack>

          <Stack align="center" direction="row" gap="10" px="4">
            <For each={["sm", "md", "lg"]}>
              {(size) => (
                <Status size={size} width="100px" value="success">
                  Approved
                </Status>
              )}
            </For>
          </Stack>

          <Stack align="center" direction="row" gap="10" px="4">
            <For each={["sm", "md", "lg"]}>
              {(size) => (
                <Status size={size} width="100px" value="error">
                  Error
                </Status>
              )}
            </For>
          </Stack>
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
        <Playground.SectionTitle id="prose">Prose</Playground.SectionTitle>
        <Prose
          dangerouslySetInnerHTML={{
            __html: `
<h1>Title Heading 1</h1>
<h2>Title Heading 2</h2>
<h3>Title Heading 3</h3>
<h4>Title Heading 4</h4>

<h4>Title Heading 4 <code>testing</code></h4>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at dolor
  nec ex rutrum semper. Praesent ultricies purus eget lectus tristique
  egestas ac in lacus. Nulla eleifend lorem risus, sit amet dictum nisi
  gravida eget. Suspendisse odio sem, scelerisque congue luctus nec,
  scelerisque ultrices orci. Praesent tincidunt, risus ut commodo cursus,
  ligula orci tristique justo, vitae sollicitudin lacus risus dictum orci.

  Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
</p>

<p>
  Vivamus vel enim at lorem ultricies faucibus. Cras vitae ipsum ut quam
  varius dignissim a ac tellus. Aliquam maximus mauris eget tincidunt
  interdum. Fusce vitae massa non risus congue tincidunt. Pellentesque
  maximus elit quis eros lobortis dictum.
</p>

<hr />

<p>
  Fusce placerat ipsum vel sollicitudin imperdiet. Morbi vulputate non
  diam at consequat. Donec vitae sem eu arcu auctor scelerisque vel in
  turpis. Pellentesque dapibus justo dui, quis egestas sapien porttitor
  in.
</p>
          `,
          }}
        />
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
        <Playground.SectionTitle id="file-button">
          File Button
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <FileButton width="auto">
            <Button variant="outline" startIcon={<HiUpload />}>
              Upload file
            </Button>
          </FileButton>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="slider">Slider</Playground.SectionTitle>
        <Stack gap="4" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              align="center"
              key={colorPalette}
              direction="row"
              gap="10"
              px="4"
            >
              <Text minW="8ch">{colorPalette}</Text>
              <Slider
                width="200px"
                colorPalette={colorPalette}
                defaultValue={[40]}
                marks={[0, 50, 100]}
              />
              <Slider
                width="200px"
                colorPalette={colorPalette}
                defaultValue={[25, 75]}
              />
            </Stack>
          ))}
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
