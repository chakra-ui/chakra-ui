import { Text } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "compositions/ui/timeline"
import { LuCheck, LuPackage, LuShip } from "react-icons/lu"

export const TimelineBasic = () => {
  return (
    <TimelineRoot maxW="400px">
      <TimelineItem>
        <TimelineConnector>
          <LuShip />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle>Product Shipped</TimelineTitle>
          <TimelineDescription>13th May 2021</TimelineDescription>
          <Text textStyle="sm">
            We shipped your product via <strong>FedEx</strong> and it should
            arrive within 3-5 business days.
          </Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <LuCheck />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle textStyle="sm">Order Confirmed</TimelineTitle>
          <TimelineDescription>18th May 2021</TimelineDescription>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <LuPackage />
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle textStyle="sm">Order Delivered</TimelineTitle>
          <TimelineDescription>20th May 2021, 10:30am</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  )
}
