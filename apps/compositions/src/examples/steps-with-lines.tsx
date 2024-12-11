import { Button } from "@chakra-ui/react"
import { HStack, Steps } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react/"

export const StepsWithLines = () => {
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

const steps = [
  { value: "first", title: "First", description: "Contact Info" },
  { value: "second", title: "Second", description: "Date & Time" },
  { value: "third", title: "Third", description: "Select Rooms" },
]
