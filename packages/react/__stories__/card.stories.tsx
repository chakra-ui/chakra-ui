import {
  Box,
  Button,
  Card,
  Field,
  For,
  HStack,
  Heading,
  Image,
  Input,
  Label,
  Span,
  Stack,
  Text,
  useSlotRecipe,
} from "../src"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Card",
  decorators: [
    (Story: any) => (
      <Box mx="auto" padding="10">
        <Story />
      </Box>
    ),
  ],
}

export const Variants = () => {
  const recipe = useSlotRecipe("card")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <td>
              <Card.Root variant={v}>
                <Card.Header>
                  <Heading size="md"> Card Title</Heading>
                </Card.Header>
                <Card.Body>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="solid" colorPalette="blue">
                    Button
                  </Button>
                </Card.Footer>
              </Card.Root>
            </td>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const Sizes = () => {
  const recipe = useSlotRecipe("card")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={recipe.variantMap.variant}>
          {(v) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {v}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(s) => (
                  <td>
                    <Card.Root size={s} variant={v}>
                      <Card.Header>
                        <Heading size={s} fontWeight="semibold">
                          Card Title
                        </Heading>
                      </Card.Header>
                      <Card.Body>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </Text>
                      </Card.Body>
                      <Card.Footer>
                        <Button variant="solid" colorPalette="blue">
                          Button
                        </Button>
                      </Card.Footer>
                    </Card.Root>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithImage = () => (
  <Card.Root maxW="sm">
    <Card.Body>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />
      <Stack mt="6" gap="3">
        <Heading size="md" fontWeight="semibold">
          Living room Sofa
        </Heading>
        <Text color="fg.muted">
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces, earthy toned spaces and for people who love a chic design with
          a sprinkle of vintage design.
        </Text>
        <Text fontSize="2xl" letterSpacing="tight">
          $450
        </Text>
      </Stack>
    </Card.Body>
    <Card.Footer>
      <HStack gap="2">
        <Button variant="solid" colorPalette="blue">
          Buy now
        </Button>
        <Button variant="ghost" colorPalette="blue">
          Add to cart
        </Button>
      </HStack>
    </Card.Footer>
  </Card.Root>
)

export const Horizontal = () => (
  <Card.Root direction="row" overflow="hidden" maxWidth="xl">
    <Image
      objectFit="cover"
      maxW="200px"
      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      alt="Caffe Latte"
    />
    <Box>
      <Card.Body>
        <Heading size="md">The perfect latte</Heading>
        <Text py="2" color="fg.muted">
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="solid" colorPalette="blue">
          Buy Latte
        </Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)

export const WithForm = () => (
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
    <Card.Footer justifyContent="flex-end" gap="4">
      <Button variant="outline">Cancel</Button>
      <Button variant="solid">Sign in</Button>
    </Card.Footer>
  </Card.Root>
)
