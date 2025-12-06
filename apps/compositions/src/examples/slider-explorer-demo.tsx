import { Box, Slider, Stack } from "@chakra-ui/react"

export const SliderExplorerDemo = () => {
  return (
    <Stack maxW="280px" gap="8" w="full">
      <Slider.Root defaultValue={[40]} orientation="horizontal">
        <Slider.Label mb="2" fontWeight="medium">
          Volume
        </Slider.Label>

        <Slider.Control height="6" display="flex" alignItems="center">
          <Slider.Track bg="gray.200" rounded="full" height="2">
            <Slider.Range bg="blue.500" rounded="full" />
          </Slider.Track>

          <Slider.Thumb index={0}>
            <Box
              bg="white"
              borderWidth="2px"
              borderColor="blue.500"
              rounded="full"
              boxSize="5"
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="sm"
            >
              <Slider.ValueText fontSize="xs" color="blue.600" />
              <Slider.DraggingIndicator />
            </Box>
          </Slider.Thumb>

          <Slider.MarkerGroup mt="4">
            <Slider.Marker value={0}>0</Slider.Marker>
            <Slider.Marker value={50}>50</Slider.Marker>
            <Slider.Marker value={100}>100</Slider.Marker>
          </Slider.MarkerGroup>

          <Slider.MarkerIndicator />
        </Slider.Control>
      </Slider.Root>
    </Stack>
  )
}
