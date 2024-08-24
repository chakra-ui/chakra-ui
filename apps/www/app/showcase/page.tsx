import {
  CardBody,
  CardDescription,
  CardRoot,
  CardTitle,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import { showcases } from ".velite"

export default function Page() {
  return (
    <VStack pt="10" pb="16" gap="10">
      <VStack>
        <Text color="fg">Community</Text>
        <Heading as="h1" size="5xl">
          Showcase
        </Heading>
        <Text
          textWrap="balance"
          maxWidth="2xl"
          textAlign="center"
          color="fg.muted"
        >
          Discover amazing projects built with Chakra UI.
        </Text>
      </VStack>

      <SimpleGrid minChildWidth="240px" gap="6">
        {showcases.map(({ title, description, url, image }) => (
          <CardRoot size="sm" key={url} asChild overflow="hidden">
            <Link href={url}>
              <Image
                src={image}
                alt={title}
                aspectRatio="16/9"
                objectFit="cover"
              />

              <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardBody>
            </Link>
          </CardRoot>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
