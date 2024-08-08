import { StepsBasic } from "compositions/examples/steps-basic"
import { StepsSizeTable } from "compositions/examples/steps-size-table"
import { StepsVariantTable } from "compositions/examples/steps-variant-table"
import { StepsVertical } from "compositions/examples/steps-vertical"
import { StepsWithDescription } from "compositions/examples/steps-with-description"
import { StepsWithIcon } from "compositions/examples/steps-with-icon"
import { Box, Button, Center, HStack } from "../src"
import { Steps } from "../src/components/steps"

export default {
  title: "Components / Steps",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <StepsBasic />
}

export const Vertical = () => {
  return <StepsVertical />
}

export const WithDescription = () => {
  return <StepsWithDescription />
}

export const WithIcon = () => {
  return <StepsWithIcon />
}

export const Variants = () => {
  return <StepsVariantTable />
}

export const Sizes = () => {
  return <StepsSizeTable />
}

const steps = [
  { value: "first", title: "First", description: "Contact Info" },
  { value: "second", title: "Second", description: "Date & Time" },
  { value: "third", title: "Third", description: "Select Rooms" },
]

export const WithLines = () => {
  return (
    <Steps.Root defaultValue={1} count={steps.length}>
      <Steps.List gap="4">
        {steps.map((item, index) => (
          <Steps.Item
            flex="1!"
            flexDir="column"
            alignItems="flex-start"
            index={index}
            key={index}
            gap="2"
          >
            <Steps.Separator h="3px" flex="unset" display="initial!" mx="0!" />
            <Steps.Trigger>
              <Steps.Title>{item.title}</Steps.Title>
            </Steps.Trigger>
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((item, index) => (
        <Steps.Content index={index} key={index}>
          <Center minHeight="20" borderWidth="1px">
            {item.title} - {item.description}
          </Center>
        </Steps.Content>
      ))}

      <Steps.Content index={steps.length}>
        <Center minHeight="20" borderWidth="1px">
          Complete - Thank you!
        </Center>
      </Steps.Content>

      <HStack mt="5">
        <Steps.PrevTrigger asChild>
          <Button size="sm" variant="outline">
            Prev
          </Button>
        </Steps.PrevTrigger>

        <Steps.NextTrigger asChild>
          <Button size="sm" variant="outline">
            Next
          </Button>
        </Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  )
}
