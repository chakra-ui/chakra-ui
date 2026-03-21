"use client"

import { Avatar, Box, Card, HStack, Marquee, Stack } from "@chakra-ui/react"
import { IoStar } from "react-icons/io5"

export const MarqueeWithTestimonials = () => (
  <Marquee.Root pauseOnInteraction py="10">
    <Marquee.Edge side="start" />
    <Marquee.Viewport>
      <Marquee.Content>
        {testimonials.map((item, i) => (
          <Marquee.Item key={i} px="1rem">
            <TestimonialCard item={item} />
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
    <Marquee.Edge side="end" />
  </Marquee.Root>
)

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <Card.Root maxW="sm" h="full">
      <Card.Body>
        <Stack gap="3">
          <HStack gap="1">
            {[...Array(5)].map((_, i) => (
              <Box as={IoStar} key={i} color="orange.solid" />
            ))}
          </HStack>

          <Card.Description color="fg.muted" textStyle="md" minH="16">
            "{item.content}"
          </Card.Description>

          <HStack gap="3" mt="1">
            <Avatar.Root size="sm">
              <Avatar.Image src={item.avatar} />
              <Avatar.Fallback name={item.name} />
            </Avatar.Root>
            <Box textStyle="sm">
              <Box fontWeight="medium" color="fg">
                {item.name}
              </Box>
              <Box color="fg.muted">{item.role}</Box>
            </Box>
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

interface Testimonial {
  name: string
  role: string
  rating: number
  avatar: string
  content: string
}

const testimonials: Testimonial[] = [
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
