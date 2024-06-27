import {
  Box,
  Button,
  Center,
  For,
  HStack,
  Span,
  Stack,
  useSlotRecipe,
} from "../src"
import { Steps } from "../src/components/steps"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Steps",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

const steps = [
  { value: "first", title: "First", description: "Contact Info" },
  { value: "second", title: "Second", description: "Date & Time" },
  { value: "third", title: "Third", description: "Select Rooms" },
]

const HorizontalSteps = (props: Partial<Steps.RootProps>) => {
  return (
    <Steps.Root {...props} count={steps.length}>
      <Steps.List>
        {steps.map((item, index) => (
          <Steps.Item index={index} key={index}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Box flexShrink="0">
                <Steps.Title>{item.title}</Steps.Title>
                <Steps.Description>{item.description}</Steps.Description>
              </Box>
            </Steps.Trigger>

            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((item, index) => (
        <Steps.Content index={index} key={index}>
          <Center minHeight="20" borderWidth="1px">
            {item.title} - {item.description}
          </Center>
        </Steps.Content>
      ))}

      <Steps.Content index={steps.length}>
        <Center minHeight="20" borderWidth="1px">
          Complete - Thank you!
        </Center>
      </Steps.Content>

      <HStack mt="5">
        <Steps.PrevTrigger asChild>
          <Button size="sm" variant="outline">
            Prev
          </Button>
        </Steps.PrevTrigger>

        <Steps.NextTrigger asChild>
          <Button size="sm" variant="outline">
            Next
          </Button>
        </Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  )
}

const VerticalSteps = (props: Partial<Steps.RootProps>) => {
  return (
    <Steps.Root
      minHeight="500px"
      gap="10"
      orientation="vertical"
      count={steps.length}
      {...props}
    >
      <Steps.List>
        {steps.map((item, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Trigger>
              <Steps.Indicator />

              <Box flexShrink="0">
                <Steps.Title>{item.title}</Steps.Title>
                <Steps.Description>{item.description}</Steps.Description>
              </Box>
            </Steps.Trigger>

            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      <Stack width="full" padding="5">
        {steps.map((item, index) => (
          <Steps.Content index={index} key={index}>
            <Center minHeight="20" borderWidth="1px">
              {item.title} - {item.description}
            </Center>
          </Steps.Content>
        ))}

        <Steps.Content index={steps.length}>
          <Center minHeight="20" borderWidth="1px">
            Complete - Thank you!
          </Center>
        </Steps.Content>

        <HStack mt="5">
          <Steps.PrevTrigger asChild>
            <Button size="sm" variant="outline">
              Prev
            </Button>
          </Steps.PrevTrigger>

          <Steps.NextTrigger asChild>
            <Button size="sm" variant="outline">
              Next
            </Button>
          </Steps.NextTrigger>
        </HStack>
      </Stack>
    </Steps.Root>
  )
}

export const Basic = () => {
  return <HorizontalSteps />
}

export const Vertical = () => {
  return (
    <VerticalSteps
      onStepComplete={() => {
        console.log("onStepComplete")
      }}
    />
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("steps")
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
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <HorizontalSteps
                      variant={v}
                      colorPalette={c}
                      minW="600px"
                    />
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
  const recipe = useSlotRecipe("steps")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td key={v}>
                    <HorizontalSteps size={v} variant={c} minW="600px" />
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

export const WithLines = () => {
  return (
    <Steps.Root defaultValue={1} count={steps.length}>
      <Steps.List gap="4">
        {steps.map((item, index) => (
          <Steps.Item
            flex="1!"
            flexDir="column"
            alignItems="flex-start"
            index={index}
            key={index}
            gap="2"
          >
            <Steps.Separator h="3px" flex="unset" display="initial!" mx="0!" />
            <Steps.Trigger>
              <Steps.Title>{item.title}</Steps.Title>
            </Steps.Trigger>
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((item, index) => (
        <Steps.Content index={index} key={index}>
          <Center minHeight="20" borderWidth="1px">
            {item.title} - {item.description}
          </Center>
        </Steps.Content>
      ))}

      <Steps.Content index={steps.length}>
        <Center minHeight="20" borderWidth="1px">
          Complete - Thank you!
        </Center>
      </Steps.Content>

      <HStack mt="5">
        <Steps.PrevTrigger asChild>
          <Button size="sm" variant="outline">
            Prev
          </Button>
        </Steps.PrevTrigger>

        <Steps.NextTrigger asChild>
          <Button size="sm" variant="outline">
            Next
          </Button>
        </Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  )
}
