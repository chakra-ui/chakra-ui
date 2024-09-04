import type { Meta } from "@storybook/react"
import { Box, Button, Center, HStack, Steps } from "../src"

export default {
  title: "Components / Steps",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { StepsBasic as Basic } from "compositions/examples/steps-basic"
export { StepsSizeTable as Sizes } from "compositions/examples/steps-size-table"
export { StepsVariantTable as Variants } from "compositions/examples/steps-variant-table"
export { StepsVertical as Vertical } from "compositions/examples/steps-vertical"
export { StepsWithDescription as Description } from "compositions/examples/steps-with-description"
export { StepsWithIcon as Icon } from "compositions/examples/steps-with-icon"

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
