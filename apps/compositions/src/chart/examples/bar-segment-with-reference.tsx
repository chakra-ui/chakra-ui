import { Box, Stack } from "@chakra-ui/react"
import {
  BarSegment,
  BarSegmentLabelList,
  BarSegmentReference,
  BarSegmentValueList,
} from "compositions/chart/bar-segment"
import { useChartConfig } from "compositions/chart/chart"

export const BarSegmentWithReference = () => {
  const chart = useChartConfig({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "teal.solid" },
      { name: "Direct", value: 100000, color: "blue.solid" },
      { name: "Bing", value: 200000, color: "orange.solid" },
      { name: "Yandex", value: 100000, color: "purple.solid" },
    ],
  })

  return (
    <Box maxW="md">
      <Stack width="full" gap="1">
        <BarSegmentValueList chart={chart} />
        <BarSegment chart={chart}>
          <BarSegmentReference chart={chart} value={200000} />
        </BarSegment>
        <BarSegmentLabelList chart={chart} />
      </Stack>
    </Box>
  )
}
