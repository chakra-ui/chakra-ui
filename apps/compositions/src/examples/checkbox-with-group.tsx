import { Box, CheckboxGroup, Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithGroup = () => {
  return (
    <CheckboxGroup defaultValue={["react"]} name="framework">
      <Box fontSize="sm" mb="2">
        Select framework
      </Box>
      <Stack align="flex-start">
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="svelte">Svelte</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="angular">Angular</Checkbox>
      </Stack>
    </CheckboxGroup>
  )
}
