import { Avatar, Box, HStack, Marquee, Stack, Text } from "@chakra-ui/react"
import { IoStar } from "react-icons/io5"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    content:
      "This library saved me weeks of work. The components are accessible and easy to customize.",
  },
  {
    name: "Michael Torres",
    role: "Frontend Dev",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    content:
      "The animations are buttery smooth. I love how easy it is to implement the marquee.",
  },
  {
    name: "Emily Wang",
    role: "CTO",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    content:
      "Scalable, reliable, and beautiful. Highly recommended for any modern web project.",
  },
  {
    name: "David Smith",
    role: "Marketing Lead",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    content:
      "Our conversion rates increased by 15% after switching to this UI system.",
  },
  {
    name: "Jessica Lee",
    role: "Indie Hacker",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    content:
      "Documentation is top-notch. I was able to build my MVP in a single weekend.",
  },
]

export const MarqueeTestimonials = () => (
  <Box py="10" bg="gray.50">
    <Marquee.Root pauseOnInteraction>
      <Marquee.Edge side="start" />
      <Marquee.Viewport>
        <Marquee.Content>
          {testimonials.map((item, i) => (
            <Marquee.Item key={i} style={{ padding: "0 1rem" }}>
              <TestimonialCard item={item} />
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" />
    </Marquee.Root>
  </Box>
)

const TestimonialCard = ({ item }: { item: (typeof testimonials)[0] }) => (
  <Box
    w="320px"
    p="6"
    bg="white"
    borderRadius="xl"
    boxShadow="sm"
    borderWidth="1px"
    borderColor="gray.100"
    whiteSpace="normal"
    h="full"
  >
    <Stack gap="3">
      <HStack gap="1">
        {[...Array(5)].map((_, i) => (
          <Box
            as={IoStar}
            key={i}
            color={i < item.rating ? "orange.400" : "gray.200"}
          />
        ))}
      </HStack>

      <Text color="gray.600" fontSize="md" lineHeight="tall">
        "{item.content}"
      </Text>

      <HStack gap="3" mt="1">
        <Avatar.Root size="sm">
          <Avatar.Image src={item.avatar} />
          <Avatar.Fallback name={item.name} />
        </Avatar.Root>
        <Box>
          <Text fontWeight="bold" fontSize="sm" color="gray.900">
            {item.name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {item.role}
          </Text>
        </Box>
      </HStack>
    </Stack>
  </Box>
)
