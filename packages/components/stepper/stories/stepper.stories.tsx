import { Step, StepDescription, StepIcon, StepTitle } from "../src"
import { Box, HStack } from "@chakra-ui/layout"

export default {
  title: "Components / Stepper",
}

export const Basic = () => {
  return (
    <Step status="active">
      <HStack>
        <StepIcon />
        <Box>
          <StepTitle>First Step</StepTitle>
          <StepDescription>Create an account</StepDescription>
        </Box>
      </HStack>
    </Step>
  )
}
