import { Button, Card, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const CardWithForm = () => (
  <Card.Root bg="bg.subtle">
    <Card.Header>
      <Heading size="lg" mb="3">
        Sign up
      </Heading>
      <Text color="fg.muted">Fill in the form below to create an account</Text>
    </Card.Header>
    <Card.Body>
      <Stack maxW="sm" gap="4">
        <Field label="First Name">
          <Input />
        </Field>
        <Field label="Last Name">
          <Input />
        </Field>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end" gap="2">
      <Button variant="outline">Cancel</Button>
      <Button variant="solid">Sign in</Button>
    </Card.Footer>
  </Card.Root>
)
