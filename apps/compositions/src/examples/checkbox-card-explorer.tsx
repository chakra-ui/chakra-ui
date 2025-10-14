"use client"

import { Box, Button, CheckboxCard, Text } from "@chakra-ui/react"

export const CheckboxCardExplorer = () => {
  return (
    <CheckboxCard.Root
      defaultChecked
      maxW="280px"
      border="none"
      shadow="none"
      rounded="lg"
      px="3"
      py="2"
      _checked={{ border: "1px solid", borderColor: "fg.subtle" }}
    >
      <CheckboxCard.HiddenInput />

      <CheckboxCard.Control>
        <CheckboxCard.Addon border="none">
          <Box
            bg="blue.500"
            color="white"
            fontWeight="bold"
            rounded="full"
            w="6"
            h="6"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
          >
            N
          </Box>
        </CheckboxCard.Addon>

        <Box flex="1">
          <CheckboxCard.Label fontWeight="medium">Next.js</CheckboxCard.Label>
          <CheckboxCard.Description fontSize="sm" color="fg.muted">
            A React framework for building web apps.
          </CheckboxCard.Description>
        </Box>

        <CheckboxCard.Indicator />
      </CheckboxCard.Control>

      <CheckboxCard.Content>
        <Text fontSize="sm" color="fg.muted" mb="2">
          Includes features like server-side rendering, API routes, and
          internationalization.
        </Text>
        <Button size="sm" variant="outline" colorScheme="blue">
          Learn More
        </Button>
      </CheckboxCard.Content>
    </CheckboxCard.Root>
  )
}
