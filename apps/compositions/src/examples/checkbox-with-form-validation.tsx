"use client"

import { Alert, Button, Checkbox, Field, Input, Stack } from "@chakra-ui/react"
import { useState } from "react"

interface FormData {
  username: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  username?: string
  password?: string
}

export const CheckboxWithFormValidation = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string>("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitMessage("Form submitted successfully!")
      console.log("Form data:", formData)

      // Reset form
      setFormData({ username: "", password: "", rememberMe: false })
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack maxW="sm" gap="4" align="flex-start">
        {submitMessage && (
          <Alert.Root
            status={submitMessage.includes("error") ? "error" : "success"}
          >
            <Alert.Indicator />
            <Alert.Description>{submitMessage}</Alert.Description>
          </Alert.Root>
        )}

        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            aria-describedby="username-error"
          />
          {errors.username && (
            <Field.ErrorText id="username-error">
              {errors.username}
            </Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            aria-describedby="password-error"
          />
          {errors.password && (
            <Field.ErrorText id="password-error">
              {errors.password}
            </Field.ErrorText>
          )}
        </Field.Root>

        <Checkbox.Root
          mt="2"
          checked={formData.rememberMe}
          onCheckedChange={(details) =>
            handleInputChange("rememberMe", details.checked)
          }
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Remember me for 30 days</Checkbox.Label>
        </Checkbox.Root>

        <Button
          type="submit"
          variant="solid"
          mt="3"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </Stack>
    </form>
  )
}
