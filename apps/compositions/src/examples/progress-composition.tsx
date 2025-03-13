import {
  HStack,
  Heading,
  Progress,
  Span,
  Square,
  Stack,
} from "@chakra-ui/react"
import { HiFolder, HiLockClosed, HiPencil } from "react-icons/hi"

export const ProgressComposition = () => {
  return (
    <Stack gap="8" maxW="300px">
      <Heading size="sm">Features</Heading>
      <FeatureUsage
        data={{ max: 100, value: 65, label: "Private Users" }}
        icon={<HiLockClosed />}
      />
      <FeatureUsage
        data={{ max: 100, value: 50, label: "Editors" }}
        icon={<HiPencil />}
      />
      <FeatureUsage
        data={{ max: 5, value: 1, label: "Projects" }}
        icon={<HiFolder />}
      />
    </Stack>
  )
}

interface FeatureData {
  min?: number
  max: number
  value: number
  label: string
}

interface FeatureUsageProps {
  icon: React.ReactNode
  data: FeatureData
}

const FeatureUsage = (props: FeatureUsageProps) => {
  const { data, icon } = props
  return (
    <HStack gap="4">
      <Square borderRadius="sm" bg="bg.muted" size="10">
        {icon}
      </Square>
      <Progress.Root
        size="sm"
        min={data.min}
        max={data.max}
        value={data.value}
        flex="1"
      >
        <HStack justify="space-between">
          <Progress.Label>{data.label}</Progress.Label>
          <Progress.ValueText color="inherit">
            {data.value} <Span color="fg.muted">/ {data.max}</Span>
          </Progress.ValueText>
        </HStack>
        <Progress.Track mt="2">
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </HStack>
  )
}
