import { Button } from "@chakra-ui/button"
import { CalendarIcon, ChatIcon, DeleteIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Wizard, WizardStep } from "../src"

export default {
  title: "Wizard",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="700px" mt="100px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const DefaultWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <>
      <p>Default</p>
      <Wizard py={6} colorScheme="green" activeStep={activeStep}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </Wizard>
      <Flex pt={4} justify="space-between">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </Flex>
    </>
  )
}

export const VerticalWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <>
      <p>Vertical</p>
      <Wizard
        py={6}
        orientation="vertical"
        colorScheme="blue"
        activeStep={activeStep}
      >
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </Wizard>
      <Flex pt={4} justify="space-between">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </Flex>
    </>
  )
}

export const WizardWithCustomIcons = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <>
      <p>Custom Icons</p>
      <Wizard py={6} colorScheme="green" activeStep={activeStep}>
        <WizardStep
          label="Step 1"
          icon={CalendarIcon}
          description="Here's a calendar icon"
        />
        <WizardStep
          label="Step 2"
          icon={DeleteIcon}
          description="Here's a delete icon"
        />
        <WizardStep
          label="Step 3"
          icon={ChatIcon}
          description="Here's a chat icon"
        />
      </Wizard>
      <Flex pt={4} justify="space-between">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </Flex>
    </>
  )
}
