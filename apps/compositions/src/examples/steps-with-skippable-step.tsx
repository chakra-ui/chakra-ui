"use client"

import { Button, ButtonGroup, Input, Steps, Text } from "@chakra-ui/react"
import { useState } from "react"

const steps = ["Account", "Company", "Review"]

export const StepsWithSkippableStep = () => {
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [error, setError] = useState("")

  return (
    <Steps.Root
      count={steps.length}
      linear
      isStepValid={(index) => index !== 0 || email.includes("@")}
      isStepSkippable={(index) => index === 1}
      onStepInvalid={() => setError("Enter a valid email to continue.")}
    >
      <Steps.List>
        {steps.map((title, index) => (
          <Steps.Item key={title} index={index}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Steps.Title>{title}</Steps.Title>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      <Steps.Content index={0} spaceY="2">
        <Text textStyle="sm">Enter your account email.</Text>
        <Input
          type="email"
          value={email}
          placeholder="email@example.com"
          onChange={(event) => {
            setEmail(event.target.value)
            setError("")
          }}
        />
        {error && (
          <Text role="alert" color="fg.error" textStyle="sm">
            {error}
          </Text>
        )}
      </Steps.Content>

      <Steps.Content index={1} spaceY="2">
        <Text textStyle="sm">
          Company details are optional, so this step can be skipped.
        </Text>
        <Input
          value={company}
          placeholder="Company name (optional)"
          onChange={(event) => setCompany(event.target.value)}
        />
      </Steps.Content>

      <Steps.Content index={2} spaceY="2">
        <Text>Email: {email}</Text>
        <Text>Company: {company || "Not provided"}</Text>
      </Steps.Content>

      <Steps.CompletedContent>Setup complete.</Steps.CompletedContent>

      <ButtonGroup size="sm" variant="outline" mt="4">
        <Steps.PrevTrigger asChild>
          <Button>Back</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button>Next</Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  )
}
