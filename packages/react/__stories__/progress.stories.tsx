import { HiFolder, HiLockClosed, HiPencil } from "react-icons/hi"
import {
  Box,
  For,
  HStack,
  Heading,
  Span,
  Square,
  Stack,
  useSlotRecipe,
} from "../src"
import { Progress } from "../src/components/progress"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Progress - Linear",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

const DemoProgress = (props: Progress.RootProps) => {
  return (
    <Progress.Root {...props}>
      <Progress.Track>
        <Progress.FilledTrack />
      </Progress.Track>
    </Progress.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("Progress")
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
                    <Stack minW="200px">
                      <DemoProgress colorPalette={c} variant={v} value={65} />
                      <DemoProgress
                        colorPalette={c}
                        variant={v}
                        hasStripe
                        value={65}
                      />
                      <DemoProgress
                        colorPalette={c}
                        variant={v}
                        hasStripe
                        isAnimated
                        value={65}
                      />
                    </Stack>
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
  const recipe = useSlotRecipe("Progress")
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
                    <DemoProgress
                      minW="200px"
                      colorPalette={c}
                      size={v}
                      value={65}
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

interface FeatureUsageProps {
  min?: number
  max: number
  value: number
  label: string
  icon: React.ReactNode
}

const FeatureUsage = (props: FeatureUsageProps) => {
  const { min, max, value, label, icon } = props
  return (
    <HStack gap="4">
      <Square borderRadius="sm" bg="bg.muted" size="10">
        {icon}
      </Square>
      <Progress.Root min={min} max={max} value={value} flex="1">
        <HStack justify="space-between">
          <Progress.Label>{label}</Progress.Label>
          <Progress.ValueText color="inherit">
            {value} <Span color="fg.muted">/ {max}</Span>
          </Progress.ValueText>
        </HStack>
        <Progress.Track mt="2">
          <Progress.FilledTrack />
        </Progress.Track>
      </Progress.Root>
    </HStack>
  )
}

export const WithIcon = () => {
  return (
    <Stack gap="8" maxW="300px">
      <Heading size="sm">Features</Heading>
      <FeatureUsage
        max={100}
        value={65}
        label="Private Users"
        icon={<HiLockClosed />}
      />
      <FeatureUsage max={100} value={50} label="Editors" icon={<HiPencil />} />
      <FeatureUsage max={5} value={1} label="Projects" icon={<HiFolder />} />
    </Stack>
  )
}
