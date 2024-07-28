import {
  Button,
  Card,
  Field,
  Heading,
  Input,
  Label,
  Stack,
  Text,
} from "@chakra-ui/react"

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
        <Field>
          <Label>First Name</Label>
          <Input />
        </Field>
        <Field>
          <Label>Last Name</Label>
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
