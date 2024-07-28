import {
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"
import { Button } from "compositions/ui/button"

export const CardHorizontal = () => (
  <Card.Root flexDirection="row" overflow="hidden">
    <Image
      objectFit="cover"
      maxW="200px"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <Box>
      <Card.Body>
        <Heading size="md">The perfect latte</Heading>
        <Text py="2" color="fg.muted" mb="2">
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Text>
        <HStack>
          <Badge>Hot</Badge>
          <Badge>Caffeine</Badge>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <Button>Buy Latte</Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)
