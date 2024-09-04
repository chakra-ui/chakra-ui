import { Text } from "@chakra-ui/react"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
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
          <Text textStyle="sm">Product Shipped</Text>
          <Text fontSize="xs" color="fg.subtle">
            13th May 2021
          </Text>
          <Text mt="5" textStyle="sm">
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
          <Text textStyle="sm">Order Confirmed</Text>
          <Text fontSize="xs" color="fg.subtle">
            18th May 2021
          </Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <LuPackage />
        </TimelineConnector>
        <TimelineContent>
          <Text textStyle="sm">Order Delivered</Text>
          <Text fontSize="xs" color="fg.subtle">
            20th May 2021, 10:30am
          </Text>
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  )
}
