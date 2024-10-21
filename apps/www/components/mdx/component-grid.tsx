import { Box, Center, SimpleGrid, Stack } from "@chakra-ui/react"
import Link from "next/link"
import { LuCode } from "react-icons/lu"
import { kebabCase } from "scule"
import { getComponent } from "../illustrations"
import { docs } from ".velite"

const components = docs.filter(
  (doc) => doc.slug.includes("components/") && !doc.slug.includes("concepts/"),
)

export const ComponentGrid = () => {
  return (
    <SimpleGrid minChildWidth="240px" gap="6" mt="8">
      {components.map((item) => {
        const key = kebabCase(item.slug).replace("docs-components-", "")
        const Illustration = getComponent(key) ?? LuCode

        return (
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
              <Center
                height="120px"
                bg="bg.muted"
                _icon={{ color: "fg.muted" }}
              >
                <Illustration width="100%" height="100%" />
              </Center>
              <Stack gap="1" padding="4" flex="1" textStyle="sm">
                <Box fontWeight="medium">{item.title}</Box>
                <Box color="fg.muted" lineClamp="2" lineHeight="short">
                  {item.description}
                </Box>
              </Stack>
            </Link>
          </Stack>
        )
      })}
    </SimpleGrid>
  )
}
