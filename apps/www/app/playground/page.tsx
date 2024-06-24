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
  HStack,
  Heading,
  Input,
  RadioGroup,
  Spinner,
  Stack,
  Stat,
  Text,
} from "@chakra-ui/react"
import { BlockquoteWithColors } from "compositions/examples/blockquote-with-colors"
import { BreadcrumbWithSeparator } from "compositions/examples/breabcrumb-with-separator"
import { BreadcrumbBasic } from "compositions/examples/breadcrumb-basic"
import { DataListBasic } from "compositions/examples/data-list-basic"
import { DataListWithInfo } from "compositions/examples/data-list-with-info"
import { DialogSizes } from "compositions/examples/dialog-sizes"
import { DrawerBasic } from "compositions/examples/drawer-basic"
import { EmptyStateWithAction } from "compositions/examples/empty-state-with-action"
import { MenuBasic } from "compositions/examples/menu-basic"
import { MenuNested } from "compositions/examples/menu-nested"
import { MenuWithCommand } from "compositions/examples/menu-with-command"
import { MenuWithContextTrigger } from "compositions/examples/menu-with-context-trigger"
import { MenuWithRadioItems } from "compositions/examples/menu-with-radio-items"
import { ProseBasic } from "compositions/examples/prose-basic"
import { Alert } from "compositions/ui/alert"
import { Avatar } from "compositions/ui/avatar"
import { Button } from "compositions/ui/button"
import { Checkbox } from "compositions/ui/checkbox"
import { CircularProgress } from "compositions/ui/circular-progress"
import { FileButton, FileDropzone } from "compositions/ui/file-button"
import { Pagination, SimplePagination } from "compositions/ui/pagination"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "compositions/ui/popover"
import { Progress } from "compositions/ui/progress"
import { RadioItem } from "compositions/ui/radio-item"
import { Rating } from "compositions/ui/rating"
import { SegmentControl } from "compositions/ui/segment-control"
import { Slider } from "compositions/ui/slider"
import { Status } from "compositions/ui/status"
import { Switch } from "compositions/ui/switch"
import { Tag } from "compositions/ui/tag"
import { TextField } from "compositions/ui/text-field"
import { TextareaField } from "compositions/ui/textarea-field"
import { Tooltip } from "compositions/ui/tooltip"
import { HiPlus, HiUpload } from "react-icons/hi"

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

const stats = [
  { label: "New Users", value: "234", diff: -12, helpText: "Till date" },
  { label: "Sales", value: "£12,340", diff: 12, helpText: "Last 30 days" },
  { label: "Revenue", value: "3,450", diff: 4.5, helpText: "Last 30 days" },
]

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Playground.Section>
        <Playground.SectionTitle id="Dialog">Dialog</Playground.SectionTitle>
        <Stack gap="5" align="flex-start">
          <DialogSizes />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Drawer">Drawer</Playground.SectionTitle>
        <Stack gap="5" align="flex-start">
          <DrawerBasic />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Breadcrumb">
          Breadcrumb
        </Playground.SectionTitle>
        <Stack gap="5" align="flex-start">
          <BreadcrumbBasic />
          <BreadcrumbWithSeparator />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Menu">Menu</Playground.SectionTitle>
        <Stack direction="row" gap="5" align="flex-start">
          <MenuWithRadioItems />
          <MenuBasic />
          <MenuWithCommand />
          <MenuNested />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="ContextMenu">
          ContextMenu
        </Playground.SectionTitle>
        <Stack direction="row" gap="5">
          <MenuWithContextTrigger />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="DataList">
          DataList
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <DataListBasic />
          <DataListWithInfo />
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Input">Input</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <HStack gap="10" width="full">
            <TextField
              label="Email"
              placeholder="Enter your email"
              variant="filled"
            />
            <TextField
              label="Email"
              placeholder="Enter your email"
              variant="outline"
            />
          </HStack>

          <HStack gap="10" width="full">
            <TextField
              label="Email"
              description="We'll never share your email."
              placeholder="Enter your email"
              variant="outline"
            />
            <TextField
              invalid
              error="This field is required"
              label="Email"
              placeholder="Enter your email"
              variant="outline"
            />
          </HStack>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Textarea">
          Textarea
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <HStack gap="10" width="full">
            <TextareaField label="Comment" variant="filled" />
            <TextareaField label="Comment" variant="outline" />
          </HStack>

          <HStack gap="10" width="full">
            <TextareaField
              label="Comment"
              description="We'll never share your email."
              variant="outline"
            />
            <TextareaField
              invalid
              error="This field is required"
              label="Comment"
              variant="outline"
            />
          </HStack>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Popover">Popover</Playground.SectionTitle>
        <Stack align="center" direction="row" gap="10">
          <For each={["sm", "md"]}>
            {(size) => (
              <PopoverRoot key={size} size={size}>
                <PopoverTrigger>
                  <Button size={size} variant="outline">
                    Click me
                  </Button>
                </PopoverTrigger>
                <PopoverContent showArrow>
                  <PopoverBody>
                    <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle>
                    <Text my="4">
                      Naruto is a Japanese manga series written and illustrated
                      by Masashi Kishimoto.
                    </Text>
                    <Input placeholder="Your fav. character" size={size} />
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            )}
          </For>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Tag">Tag</Playground.SectionTitle>
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
              <Tag size="sm" colorPalette={colorPalette}>
                Content
              </Tag>
              <Tag icon={<HiPlus />} size="sm" colorPalette={colorPalette}>
                Content
              </Tag>
              <Tag
                size="sm"
                colorPalette={colorPalette}
                variant="solid"
                showClose
              >
                Content
              </Tag>
            </Stack>
          ))}
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Stat">Stat</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <Group gap="10" width="full">
            {stats.map((item) => (
              <Stat.Root key={item.label}>
                <Stat.Label>{item.label}</Stat.Label>
                <Stat.ValueText>{item.value}</Stat.ValueText>
                <Stat.HelpText>
                  {item.diff > 0 ? (
                    <Stat.UpIndicator />
                  ) : (
                    <Stat.DownIndicator />
                  )}
                  {item.diff}% {item.helpText}
                </Stat.HelpText>
              </Stat.Root>
            ))}
          </Group>
        </Stack>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="avatar">Avatar</Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          {colorPalettes.map((colorPalette) => (
            <Stack
              key={colorPalette}
              align="center"
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
        <BlockquoteWithColors />
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
        <ProseBasic />
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
          <EmptyStateWithAction />
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
        <Playground.SectionTitle id="FileDropzone">
          File Dropzone
        </Playground.SectionTitle>
        <Stack gap="2" align="flex-start">
          <FileDropzone />
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
          <Tooltip showArrow title="This is the tooltip content">
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
