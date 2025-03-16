import {
  Avatar,
  Button,
  Card,
  Icon,
  Input,
  Span,
  Timeline,
} from "@chakra-ui/react"
import { LuPen, LuX } from "react-icons/lu"
import LoremIpsum from "react-lorem-ipsum"

export const TimelineComposition = () => {
  return (
    <Timeline.Root size="lg" variant="subtle" maxW="md">
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
            <Icon fontSize="xs">
              <LuPen />
            </Icon>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>
            <Avatar.Root size="2xs">
              <Avatar.Image src="https://i.pravatar.cc/150?u=a" />
              <Avatar.Fallback />
            </Avatar.Root>
            Lucas Moras <Span color="fg.muted">has changed</Span>
            <Span fontWeight="medium">3 labels</Span> on
            <Span color="fg.muted">Jan 1, 2024</Span>
          </Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
            <Icon fontSize="xs">
              <LuX />
            </Icon>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>
            <Avatar.Root size="2xs">
              <Avatar.Image src="https://i.pravatar.cc/150?u=x" />
              <Avatar.Fallback />
            </Avatar.Root>
            Jenna Smith <Span color="fg.muted">removed</Span>
            <Span fontWeight="medium">Enas</Span>
            <Span color="fg.muted">on Jan 12, 2024</Span>
          </Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator bg="teal.solid" color="teal.contrast">
            <Icon fontSize="xs">
              <LuX />
            </Icon>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content gap="4">
          <Timeline.Title>
            <Avatar.Root size="2xs">
              <Avatar.Image src="https://i.pravatar.cc/150?u=y" />
              <Avatar.Fallback />
            </Avatar.Root>
            Erica <Span color="fg.muted">commented</Span>
            <Span color="fg.muted">on Jan 12, 2024</Span>
          </Timeline.Title>
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
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
            <Avatar.Root size="full">
              <Avatar.Image src="https://i.pravatar.cc/150?u=o" />
              <Avatar.Fallback />
            </Avatar.Root>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content gap="4" mt="-1" w="full">
          <Input size="sm" placeholder="Add comment..." />
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}
