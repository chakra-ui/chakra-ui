import { Box, SimpleGrid, Stack } from "@chakra-ui/react"
import Link from "next/link"
import { docs } from ".velite"

const components = docs.filter(
  (doc) => doc.slug.includes("components/") && !doc.slug.includes("concepts/"),
)

export const ComponentGrid = () => {
  return (
    <SimpleGrid minChildWidth="240px" gap="6" mt="8">
      {components.map((item) => (
        <Stack
          asChild
          gap="0"
          key={item.slug}
          borderWidth="1px"
          rounded="md"
          focusRing="inside"
          overflow="hidden"
        >
          <Link href={`/${item.slug}`}>
            <Box height="120px" bg="bg.muted" />
            <Stack gap="1" padding="4" flex="1">
              <Box fontWeight="medium">{item.title}</Box>
              <Box color="fg.muted" lineClamp="2" lineHeight="short">
                {item.description}
              </Box>
            </Stack>
          </Link>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
