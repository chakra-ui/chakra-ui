import { Button, Card, Input, Stack } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const CardWithForm = () => (
  <Card.Root maxW="sm">
    <Card.Header>
      <Card.Title>Sign up</Card.Title>
      <Card.Description>
        Fill in the form below to create an account
      </Card.Description>
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field label="First Name">
          <Input />
        </Field>
        <Field label="Last Name">
          <Input />
        </Field>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="outline">Cancel</Button>
      <Button variant="solid">Sign in</Button>
    </Card.Footer>
  </Card.Root>
)
