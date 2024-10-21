import { Button, Card, Icon, Input, Span } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "compositions/ui/timeline"
import { LuPen, LuX } from "react-icons/lu"
import LoremIpsum from "react-lorem-ipsum"

export const TimelineComposition = () => {
  return (
    <TimelineRoot size="lg" variant="subtle" maxW="md">
      <TimelineItem>
        <TimelineConnector>
          <Icon fontSize="xs">
            <LuPen />
          </Icon>
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle>
            <Avatar size="2xs" src="https://i.pravatar.cc/150?u=a" />
            Lucas Moras <Span color="fg.muted">has changed</Span>
            <Span fontWeight="medium">3 labels</Span> on
            <Span color="fg.muted">Jan 1, 2024</Span>
          </TimelineTitle>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <Icon fontSize="xs">
            <LuX />
          </Icon>
        </TimelineConnector>
        <TimelineContent>
          <TimelineTitle>
            <Avatar size="2xs" src="https://i.pravatar.cc/150?u=x" />
            Jenna Smith <Span color="fg.muted">removed</Span>
            <Span fontWeight="medium">Enas</Span>
            <Span color="fg.muted">on Jan 12, 2024</Span>
          </TimelineTitle>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector bg="teal.solid" color="teal.contrast">
          <Icon fontSize="xs">
            <LuX />
          </Icon>
        </TimelineConnector>
        <TimelineContent gap="4">
          <TimelineTitle>
            <Avatar size="2xs" src="https://i.pravatar.cc/150?u=y" />
            Erica <Span color="fg.muted">commented</Span>
            <Span color="fg.muted">on Jan 12, 2024</Span>
          </TimelineTitle>
          <Card.Root size="sm">
            <Card.Body textStyle="sm" lineHeight="tall">
              <LoremIpsum p={1} avgWordsPerSentence={2} />
            </Card.Body>
            <Card.Footer>
              <Button size="xs" variant="surface" rounded="md">
                👏 2
              </Button>
            </Card.Footer>
          </Card.Root>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineConnector>
          <Avatar size="full" src="https://i.pravatar.cc/150?u=o" />
        </TimelineConnector>
        <TimelineContent gap="4" mt="-1" w="full">
          <Input size="sm" placeholder="Add comment..." />
        </TimelineContent>
      </TimelineItem>
    </TimelineRoot>
  )
}
