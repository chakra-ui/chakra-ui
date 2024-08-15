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
          <Text>Product Shipped</Text>
          <Text fontSize="xs" color="fg.muted">
            13th May 2021
          </Text>
          <Text mt="5">
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
          <Text>Order Confirmed</Text>
          <Text fontSize="xs" color="fg.muted">
            18th May 2021
          </Text>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <LuPackage />
        </TimelineConnector>
        <TimelineContent>
          <Text>Order Delivered</Text>
          <Text fontSize="xs" color="fg.muted">
            20th May 2021, 10:30am
          </Text>
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  )
}
