import {
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"

const EggheadCourseBanner = ({ href }) => {
  return (
    <LinkBox role="group">
      <VStack
        transitionProperty="transform"
        transitionDuration="250ms"
        transitionTimingFunction="ease-out"
        _groupHover={{
          transform: "scale(1.03, 1.03)",
        }}
        p={{ base: 6, lg: 16 }}
        spacing={12}
        alignItems="flex-start"
        rounded="lg"
        bg="gray.900"
        mt={6}
      >
        <VStack spacing={4} color="gray.300" alignItems="flex-start">
          <LinkOverlay href={href} target="_blank" color="white">
            <Heading fontSize={{ base: "3xl", lg: "5xl" }}>
              Build a Modern User Interface with Chakra UI
            </Heading>
          </LinkOverlay>
          <Text>
            In this course, you will learn how to create a flexible user
            interface using Chakra UI.
          </Text>
          <Text>
            You will learn to use Chakra UI's default style props and components
            to easily build out your application, but you will also see how you
            can easily override the defaults or even create custom components to
            suit the needs of your application.
          </Text>
        </VStack>
        <HStack spacing={{ base: 4, lg: 12 }}>
          <Image
            w={{ base: 12, lg: 20 }}
            src="/egghead-banner/chakra.svg"
            alt="Chakra Logo"
          />
          <Image
            w={{ base: 12, lg: 20 }}
            src="/egghead-banner/egghead.svg"
            alt="Egghead Logo"
          />
          <Image
            w={{ base: 12, lg: 20 }}
            src="/egghead-banner/lazar.png"
            alt="Lazar's Avatar"
          />
        </HStack>
      </VStack>
    </LinkBox>
  )
}

export default EggheadCourseBanner
