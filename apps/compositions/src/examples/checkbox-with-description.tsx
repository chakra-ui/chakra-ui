import { Box, Checkbox, Stack } from "@chakra-ui/react"

export const CheckboxWithDescription = () => {
  return (
    <Checkbox.Root gap="4" alignItems="flex-start">
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Stack gap="1">
        <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
        <Box textStyle="sm" color="fg.muted">
          By clicking this, you agree to our Terms and Privacy Policy.
        </Box>
      </Stack>
    </Checkbox.Root>
  )
}
