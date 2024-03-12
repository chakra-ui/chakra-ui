import { Box, Button, For, HStack, Span, Stack, useSlotRecipe } from "../src"
import { Steps, useSteps } from "../src/components/steps"
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
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
]

const HorizontalSteps = (props: Partial<Steps.RootProps>) => {
  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <>
      <Steps.Root {...props} index={activeStep}>
        {steps.map((item, index) => (
          <Steps.Item key={index}>
            <Steps.Indicator />

            <Box flexShrink="0">
              <Steps.Title>{item.title}</Steps.Title>
              <Steps.Description>{item.description}</Steps.Description>
            </Box>

            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.Root>

      <HStack mt="5">
        <Button size="sm" onClick={goToPrevious}>
          Prev
        </Button>
        <Button size="sm" variant="solid" onClick={goToNext}>
          Next
        </Button>
      </HStack>
    </>
  )
}

const VerticalSteps = (props: Partial<Steps.RootProps>) => {
  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Stack>
      <Steps.Root {...props} index={activeStep}>
        {steps.map((item, index) => (
          <Steps.Item key={index}>
            <Steps.Indicator />

            <Box flexShrink="0">
              <Steps.Title>{item.title}</Steps.Title>
              <Steps.Description>{item.description}</Steps.Description>
            </Box>

            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.Root>

      <HStack mt="5">
        <Button size="sm" onClick={goToPrevious}>
          Prev
        </Button>
        <Button size="sm" variant="solid" onClick={goToNext}>
          Next
        </Button>
      </HStack>
    </Stack>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Steps")
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
  const recipe = useSlotRecipe("Steps")
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
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
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

export const WithVertical = () => {
  return (
    <HStack gap="10">
      <For each={colorPalettes}>
        {(c) => (
          <VerticalSteps
            key={c}
            colorPalette={c}
            orientation="vertical"
            minHeight="400px"
            gap="0"
          />
        )}
      </For>
    </HStack>
  )
}
