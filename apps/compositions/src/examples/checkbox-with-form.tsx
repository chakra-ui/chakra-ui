"use client"

import {
  Alert,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Code,
  Field,
  Fieldset,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

// 1. Zod validation schema demonstrating best-practice form validation patterns.
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  // Checkbox group validation: requires selecting at least one item.
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one preference.",
  }),
  // Single checkbox validation: requires being checked (literal true).
  // This solves common React Hook Form checkbox validation bugs.
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

type FormData = z.infer<typeof formSchema>

const interestItems = [
  { label: "Product Updates", value: "updates" },
  { label: "Weekly Newsletter", value: "newsletter" },
  { label: "Event Invitations", value: "events" },
  { label: "Special Offers", value: "offers" },
]

export const CheckboxWithForm = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  // 2. Initializing react-hook-form.
  // CRITICAL (#2413): Set explicit default values to prevent uncontrolled-to-controlled warnings.
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      interests: [],
      terms: false,
    },
  })

  // 3. Mock submission handler demonstrating loading states.
  const onSubmit = async (data: FormData) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSubmittedData(data)
  }

  const handleReset = () => {
    reset()
    setSubmittedData(null)
  }

  return (
    <Stack maxW="md" gap="6" w="full" mx="auto" p="4">
      <Card.Root variant="outlined" size="md" boxShadow="sm">
        <Card.Header>
          <Card.Title>Preferences & Sign Up</Card.Title>
          <Card.Description>
            Configure your notifications and accept our terms to register.
          </Card.Description>
        </Card.Header>

        {submittedData ? (
          // Success State display
          <Card.Body>
            <Stack gap="4">
              <Alert.Root status="success" title="Success!">
                <Alert.Indicator />
                <Alert.Title>Registration successful!</Alert.Title>
              </Alert.Root>

              <Stack gap="2">
                <Text textStyle="sm" fontWeight="semibold">
                  Submitted Payload:
                </Text>
                <Code p="3" borderRadius="md" textStyle="xs" overflowX="auto">
                  {JSON.stringify(submittedData, null, 2)}
                </Code>
              </Stack>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                mt="2"
                alignSelf="flex-start"
              >
                Reset Form
              </Button>
            </Stack>
          </Card.Body>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 
              4. loading={isSubmitting} prevents double submissions on Enter key presses (#6838).
              Setting disabled on the fieldset natively disables all inputs and controls within it.
            */}
            <fieldset disabled={isSubmitting}>
              <Card.Body>
                <Stack gap="5">
                  {/* Name Input */}
                  <Field.Root invalid={!!errors.name} required>
                    <Field.Label>Full Name</Field.Label>
                    <Input
                      placeholder="Jane Doe"
                      {...register("name")}
                      aria-describedby={
                        errors.name ? "name-error" : undefined
                      }
                    />
                    {errors.name && (
                      <Field.ErrorText id="name-error">
                        {errors.name.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Email Input */}
                  <Field.Root invalid={!!errors.email} required>
                    <Field.Label>Email Address</Field.Label>
                    <Input
                      type="email"
                      placeholder="jane.doe@example.com"
                      {...register("email")}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <Field.ErrorText id="email-error">
                        {errors.email.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* 
                    5. Checkbox Group validation with React Hook Form integration (#5799, #8285).
                    
                    CRITICAL BEST PRACTICE (#5799):
                    DO NOT set 'required={true}' on the Fieldset.Root or CheckboxGroup.
                    Setting the HTML5 'required' attribute on a group of checkboxes forces the browser
                    to require EVERY single child checkbox to be checked. Instead, we use Zod validation
                    (min(1)) for logical validation, and visually show a red asterisk next to the Legend
                    using a custom color span.
                  */}
                  <Fieldset.Root invalid={!!errors.interests}>
                    <Stack gap="1">
                      <Fieldset.Legend>
                        Notification Preferences{" "}
                        <Text as="span" color="fg.error" aria-hidden="true" ms="1">
                          *
                        </Text>
                      </Fieldset.Legend>
                      <Fieldset.HelperText>
                        Select at least one option to receive communications.
                      </Fieldset.HelperText>
                    </Stack>

                    <Controller
                      control={control}
                      name="interests"
                      render={({ field }) => (
                        <CheckboxGroup
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Fieldset.Content mt="2">
                            {interestItems.map((item) => (
                              <Checkbox.Root
                                key={item.value}
                                value={item.value}
                              >
                                <Checkbox.HiddenInput
                                  onBlur={field.onBlur}
                                />
                                <Checkbox.Control />
                                <Checkbox.Label>{item.label}</Checkbox.Label>
                              </Checkbox.Root>
                            ))}
                          </Fieldset.Content>
                        </CheckboxGroup>
                      )}
                    />

                    {/* Displays error messages correctly when invalid matches error state (#8285) */}
                    {errors.interests && (
                      <Fieldset.ErrorText>
                        {errors.interests.message}
                      </Fieldset.ErrorText>
                    )}
                  </Fieldset.Root>

                  {/* 
                    6. Single required checkbox validation pattern (#2413, #8285).
                    Properly binds Checked state with the RHF Controller to prevent default value bugs.
                  */}
                  <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                      <Field.Root invalid={!!errors.terms} required>
                        <Checkbox.Root
                          checked={field.value}
                          onCheckedChange={({ checked }) =>
                            field.onChange(checked)
                          }
                          name={field.name}
                        >
                          <Checkbox.HiddenInput onBlur={field.onBlur} />
                          <Checkbox.Control />
                          <Checkbox.Label textStyle="sm">
                            I accept the terms and privacy policy
                          </Checkbox.Label>
                        </Checkbox.Root>
                        {errors.terms && (
                          <Field.ErrorText>
                            {errors.terms.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    )}
                  />
                </Stack>
              </Card.Body>

              <Card.Footer justifyContent="flex-end" gap="3" borderTopWidth="1px" p="4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  loading={isSubmitting}
                  loadingText="Registering..."
                >
                  Submit
                </Button>
              </Card.Footer>
            </fieldset>
          </form>
        )}
      </Card.Root>
    </Stack>
  )
}
