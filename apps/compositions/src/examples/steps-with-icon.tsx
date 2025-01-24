import { Button, Group } from "@chakra-ui/react"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "compositions/ui/steps"
import { LuCalendar, LuUser, LuWallet } from "react-icons/lu"

export const StepsWithIcon = () => {
  return (
    <StepsRoot defaultValue={1} count={3}>
      <StepsList>
        <StepsItem index={0} icon={<LuUser />} />
        <StepsItem index={1} icon={<LuWallet />} />
        <StepsItem index={2} icon={<LuCalendar />} />
      </StepsList>

      <StepsContent index={0}>Contact Details</StepsContent>
      <StepsContent index={1}>Payment</StepsContent>
      <StepsContent index={2}>Book an Appointment</StepsContent>
      <StepsCompletedContent>All steps are complete!</StepsCompletedContent>

      <Group>
        <StepsPrevTrigger asChild>
          <Button variant="outline" size="sm">
            Prev
          </Button>
        </StepsPrevTrigger>
        <StepsNextTrigger asChild>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </StepsNextTrigger>
      </Group>
    </StepsRoot>
  )
}
