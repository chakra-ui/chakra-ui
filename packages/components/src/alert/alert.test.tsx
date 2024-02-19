import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Alert } from "."

test("passes a11y test", async () => {
  await testA11y(
    <Alert.Root>
      <Alert.Icon />
      <Alert.Title>Alert title</Alert.Title>
      <Alert.Description>Alert description</Alert.Description>
    </Alert.Root>,
  )
})

test("should have role='alert'", () => {
  render(
    <Alert.Root>
      <Alert.Icon />
      <Alert.Title>Alert title</Alert.Title>
      <Alert.Description>Alert description</Alert.Description>
    </Alert.Root>,
  )

  expect(screen.getByRole("alert")).toBeInTheDocument()
})
