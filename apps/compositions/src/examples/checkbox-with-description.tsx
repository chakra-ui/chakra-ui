import { Box } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithDescription = () => {
  return (
    <Checkbox gap="4" alignItems="flex-start">
      <Box lineHeight="1">I agree to the terms and conditions</Box>
      <Box fontWeight="normal" color="fg.muted" mt="1">
        By clicking this, you agree to our Terms and Privacy Policy.
      </Box>
    </Checkbox>
  )
}
