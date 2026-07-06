import { Box, Image, Stack, Text } from "@chakra-ui/react"

interface QuoteCardProps {
  quote: string
  description?: string
  image?: string
}

export const QuoteCard = (props: QuoteCardProps) => {
  const { quote, description, image } = props
  return (
    <Stack gap="6" p="8" rounded="2xl" bg="teal.subtle" position="relative">
      <Text textStyle="3xl" fontWeight="semibold" pe={image ? "10" : "0"}>
        "{quote}"
      </Text>
      {description && (
        <Text textStyle="lg" pe={image ? "10" : "0"}>
          {description}
        </Text>
      )}
      {image && (
        <Image
          src={image}
          alt={description || ""}
          h="10"
          position="absolute"
          bottom="4"
          right="4"
          rounded="full"
        />
      )}
    </Stack>
  )
}
