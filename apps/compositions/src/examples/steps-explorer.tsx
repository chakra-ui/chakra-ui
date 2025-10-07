"use client"

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Steps,
  Text,
} from "@chakra-ui/react"

export const StepsExplorer = () => {
  return (
    <Stack maxW="md" gap="8">
      <Heading size="md">Onboarding Steps</Heading>

      <Steps.Root defaultStep={1} count={steps.length} orientation="vertical">
        <Stack gap="8">
          <Steps.List gap="6">
            {steps.map((step, index) => (
              <Box key={index} position="relative">
                <Steps.Item index={index}>
                  <Steps.Indicator />
                  <Steps.Title fontWeight="semibold">{step.title}</Steps.Title>
                  <Steps.Separator />
                </Steps.Item>

                <Box pl="10" mt="2">
                  <Steps.Content index={index}>
                    <Text color="gray.500">{step.description}</Text>
                  </Steps.Content>
                </Box>
              </Box>
            ))}
          </Steps.List>

          <Steps.CompletedContent>
            <Text mt="2" fontWeight="medium" color="green.600">
              ✅ All steps are complete! You're ready to go.
            </Text>
          </Steps.CompletedContent>

          <Box>
            <ButtonGroup
              size="sm"
              variant="outline"
              width="full"
              justifyContent="space-between"
            >
              <Steps.PrevTrigger asChild>
                <Button>Previous</Button>
              </Steps.PrevTrigger>
              <Steps.NextTrigger asChild>
                <Button>Next</Button>
              </Steps.NextTrigger>
            </ButtonGroup>
          </Box>
        </Stack>
      </Steps.Root>
    </Stack>
  )
}

const steps = [
  {
    title: "Create Account",
    description:
      "Sign up with your email and create a secure password. Make sure to verify your email address.",
  },
  {
    title: "Profile Setup",
    description:
      "Add your personal details, profile picture, and preferences so we can tailor your experience.",
  },
  {
    title: "Get Started",
    description:
      "Explore the dashboard, connect with others, and start using the features immediately.",
  },
]
