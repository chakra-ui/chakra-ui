"use client"

import { Box, Button, ButtonGroup, Input, Steps, Text } from "@chakra-ui/react"
import { useState } from "react"

export const StepsWithValidation = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState<string | null>(null)

  return (
    <Steps.Root
      count={stepsData.length}
      linear
      isStepValid={(index) => stepsData[index]?.validate(formData) ?? true}
      onStepInvalid={(details) => {
        setError(`Step ${details.step + 1} is invalid`)
      }}
    >
      <Steps.List>
        {stepsData.map((step, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Box>
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description>{step.description}</Steps.Description>
              </Box>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {stepsData.map((step, index) => (
        <Steps.Content key={index} index={index} maxW="xl">
          {step.render({ formData, setFormData, setError })}
          {error && (
            <Box color="red.fg" textStyle="sm" mt="3">
              {error}
            </Box>
          )}
        </Steps.Content>
      ))}

      <Steps.CompletedContent>
        <Text>Registration complete!</Text>
      </Steps.CompletedContent>

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

interface FormData {
  name: string
  email: string
  password: string
}

interface StepRenderContext {
  formData: FormData
  setFormData: (data: FormData) => void
  setError: (error: string | null) => void
}

interface StepData {
  title: string
  description: string
  validate: (data: FormData) => boolean
  render(ctx: StepRenderContext): React.ReactNode
}

const stepsData: StepData[] = [
  {
    title: "Name",
    description: "Enter your name",
    validate(data) {
      return data.name.trim().length > 0
    },
    render(ctx) {
      return (
        <Input
          placeholder="Enter your name"
          value={ctx.formData.name}
          onChange={(e) => {
            ctx.setFormData({ ...ctx.formData, name: e.target.value })
            ctx.setError(null)
          }}
        />
      )
    },
  },
  {
    title: "Email",
    description: "Enter your email",
    validate(data) {
      return data.email.includes("@")
    },
    render(ctx) {
      return (
        <Input
          type="email"
          placeholder="email@example.com"
          value={ctx.formData.email}
          onChange={(e) => {
            ctx.setFormData({ ...ctx.formData, email: e.target.value })
            ctx.setError(null)
          }}
        />
      )
    },
  },
  {
    title: "Password",
    description: "Create a password",
    validate(data) {
      return data.password.length >= 8
    },
    render(ctx) {
      return (
        <Input
          type="password"
          placeholder="Enter password"
          value={ctx.formData.password}
          onChange={(e) => {
            ctx.setFormData({ ...ctx.formData, password: e.target.value })
            ctx.setError(null)
          }}
        />
      )
    },
  },
]
