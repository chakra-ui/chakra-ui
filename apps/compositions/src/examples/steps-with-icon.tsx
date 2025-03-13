import { Button, ButtonGroup, Steps } from "@chakra-ui/react"
import { LuCalendar, LuCheck, LuUser, LuWallet } from "react-icons/lu"

export const StepsWithIcon = () => {
  return (
    <Steps.Root defaultStep={1} count={steps.length} size="sm">
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Indicator>
              <Steps.Status incomplete={step.icon} complete={<LuCheck />} />
            </Steps.Indicator>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((step, index) => (
        <Steps.Content key={index} index={index}>
          {step.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

      <ButtonGroup size="sm" variant="outline">
        <Steps.PrevTrigger asChild>
          <Button>Prev</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button>Next</Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  )
}

const steps = [
  {
    icon: <LuUser />,
    description: "Contact Details",
  },
  {
    icon: <LuWallet />,
    description: "Payment",
  },
  {
    icon: <LuCalendar />,
    description: "Book an Appointment",
  },
]
