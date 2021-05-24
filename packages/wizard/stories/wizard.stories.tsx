import { Button } from "@chakra-ui/button"
import { CalendarIcon, ChatIcon, DeleteIcon } from "@chakra-ui/icons"
import { Flex, useColorModeValue } from "@chakra-ui/react"
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
      <Wizard py={6} colorScheme="teal" activeStep={activeStep}>
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
      <Wizard py={6} orientation="vertical" activeStep={activeStep}>
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

export const VerticalWizardWithChildren = () => {
  const [activeStep, setActiveStep] = React.useState(0)

  const color = useColorModeValue("gray.700", "gray.200")
  const bg = useColorModeValue("gray.200", "gray.700")

  return (
    <>
      <p>Vertical</p>
      <Wizard py={6} orientation="vertical" activeStep={activeStep}>
        <WizardStep label="Step 1">
          <Flex
            p={4}
            justify="space-between"
            bg={bg}
            color={color}
            rounded="md"
          >
            <chakra.span>I'm a child component!</chakra.span>
          </Flex>
        </WizardStep>
        <WizardStep label="Step 2">
          <Flex
            p={4}
            rounded="md"
            flexDir="column"
            bg={bg}
            color={color}
            textAlign="left"
            justify="space-between"
          >
            <chakra.span>I'm also a child component!</chakra.span>
            <chakra.span mt={1}>
              You can add some extra content in here describing your steps
            </chakra.span>
          </Flex>
        </WizardStep>
        <WizardStep label="Step 3">
          <Flex
            p={4}
            bg={bg}
            rounded="md"
            color={color}
            justify="space-between"
          >
            <chakra.span>I'm also a child component!</chakra.span>
          </Flex>
        </WizardStep>
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
      <Wizard
        py={6}
        colorScheme="green"
        orientation="vertical"
        activeStep={activeStep}
      >
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

export const WizardSizes = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <>
      <p>Small</p>
      <Wizard py={6} colorScheme="green" activeStep={activeStep} size="sm">
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </Wizard>
      <Flex mb={6} pt={4} justify="space-between" />
      <p>Medium</p>
      <Wizard py={6} colorScheme="green" activeStep={activeStep} size="md">
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </Wizard>
      <Flex mb={6} pt={4} justify="space-between" />
      <p>Large</p>
      <Wizard py={6} colorScheme="green" activeStep={activeStep} size="lg">
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

export const WizardStates = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  return (
    <>
      <p>Loading</p>
      <Wizard py={6} isLoading activeStep={activeStep}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
        <WizardStep label="Step 4" />
      </Wizard>
      <Flex mb={6} pt={4} justify="space-between" />
      <p>Error</p>
      <Wizard py={6} isError activeStep={activeStep}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
        <WizardStep label="Step 4" />
      </Wizard>
      <Flex pt={4} justify="space-between">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </Flex>
    </>
  )
}
