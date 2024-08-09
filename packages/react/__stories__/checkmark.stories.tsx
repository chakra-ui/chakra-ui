import { Box, Stack } from "../src"
import { Checkmark } from "../src/components/checkmark"

export default {
  title: "Components / Checkmark",
  decorators: [
    (story: Function) => (
      <Box maxW="500px" mt="40px" mx="auto">
        {story()}
      </Box>
    ),
  ],
}

export const Demo = () => {
  return (
    <Stack>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
      <Checkmark disabled />
      <Checkmark checked disabled />
      <Checkmark indeterminate disabled />
    </Stack>
  )
}
