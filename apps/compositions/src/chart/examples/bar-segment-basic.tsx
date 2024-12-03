import { Box, Stack } from "@chakra-ui/react"
import { useChartConfig } from "compositions/chart/chart"
import {
  BarSegment,
  BarSegmentLabelList,
  BarSegmentValueList,
} from "../bar-segment"

export const BarSegmentBasic = () => {
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
        <BarSegment chart={chart}></BarSegment>
        <BarSegmentLabelList chart={chart} />
      </Stack>
    </Box>
  )
}
