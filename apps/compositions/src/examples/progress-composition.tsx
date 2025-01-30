import { HStack, Heading, Span, Square, Stack } from "@chakra-ui/react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "compositions/ui/progress"
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
      <ProgressRoot
        size="sm"
        min={data.min}
        max={data.max}
        value={data.value}
        flex="1"
      >
        <HStack justify="space-between">
          <ProgressLabel>{data.label}</ProgressLabel>
          <ProgressValueText color="inherit">
            {data.value} <Span color="fg.muted">/ {data.max}</Span>
          </ProgressValueText>
        </HStack>
        <ProgressBar mt="2" />
      </ProgressRoot>
    </HStack>
  )
}
