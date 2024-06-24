import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"
import {
  Badge,
  Box,
  CheckboxCard,
  CheckboxGroup,
  Float,
  For,
  SimpleGrid,
  Span,
  Stack,
  Text,
  VStack,
  chakra,
  useSlotRecipe,
} from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Checkbox Card",
  decorators: [
    (story: Function) => (
      <chakra.div mt="40px" mx="10">
        {story()}
      </chakra.div>
    ),
  ],
}

const DemoCheckboxCard = (props: CheckboxCard.RootProps) => {
  const { children = "CheckboxCard", ...rest } = props
  return (
    <CheckboxCard.Root width="300px" {...rest}>
      <CheckboxCard.Control>
        <Stack gap="0" flex="1">
          <CheckboxCard.Label>{children}</CheckboxCard.Label>
          <Text>Some description</Text>
        </Stack>

        <CheckboxCard.HiddenInput />
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

export const Demo = () => {
  return (
    <Stack>
      <DemoCheckboxCard />
      <DemoCheckboxCard defaultChecked />
      <DemoCheckboxCard disabled />
      <DemoCheckboxCard defaultChecked disabled />
    </Stack>
  )
}

export const WithAddon = () => {
  return (
    <CheckboxCard.Root width="300px" colorPalette="purple">
      <CheckboxCard.Control>
        <Stack gap="0" flex="1">
          <CheckboxCard.Label>Checkbox</CheckboxCard.Label>
          <Text>Some description</Text>
        </Stack>

        <CheckboxCard.HiddenInput />
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>

      <CheckboxCard.Addon>
        Some supporting text
        <Badge ms="2" colorPalette="purple">
          New
        </Badge>
      </CheckboxCard.Addon>
    </CheckboxCard.Root>
  )
}

export const WithIcon = () => {
  const items = [
    {
      icon: <HiShieldCheck />,
      label: "Admin",
      description: "Give full access",
    },
    {
      icon: <HiUser />,
      label: "User",
      description: "Give limited access",
    },
    {
      icon: <HiGlobeAlt />,
      label: "Guest",
      description: "Give read-only access",
    },
    {
      icon: <HiLockClosed />,
      label: "Blocked",
      description: "No access",
    },
  ]

  return (
    <SimpleGrid columns={2} gap="5" maxW="md">
      <For each={items}>
        {(item) => (
          <CheckboxCard.Root
            variant="subtle"
            defaultChecked={item.label === "Guest"}
          >
            <CheckboxCard.Control>
              <VStack gap="1" flex="1" textAlign="center">
                <Box mb="2" css={{ "& svg": { fontSize: "2xl" } }}>
                  {item.icon}
                </Box>
                <CheckboxCard.Label color="inherit!">
                  {item.label}
                </CheckboxCard.Label>
                <Text>{item.description}</Text>
              </VStack>

              <CheckboxCard.HiddenInput />
              <Float placement="top-end" offset="4">
                <CheckboxCard.Indicator />
              </Float>
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        )}
      </For>
    </SimpleGrid>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("checkboxCard")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td>
                    <Stack gap="4">
                      <DemoCheckboxCard variant={v} colorPalette={c} />
                      <DemoCheckboxCard
                        variant={v}
                        colorPalette={c}
                        defaultChecked
                      />
                      <DemoCheckboxCard
                        variant={v}
                        colorPalette={c}
                        defaultChecked
                        disabled
                      />
                    </Stack>
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

export const Sizes = () => {
  const recipe = useSlotRecipe("checkboxCard")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>
            {(v) => (
              <td>
                <Stack gap="4">
                  <DemoCheckboxCard size={v} variant="plain" defaultChecked />
                  <DemoCheckboxCard size={v} variant="subtle" defaultChecked />
                </Stack>
              </td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}

export const WithGroup = () => {
  return (
    <CheckboxGroup
      defaultValue={["one", "two"]}
      onValueChange={(value) => console.log(value)}
    >
      <Stack align="start">
        <DemoCheckboxCard value="one">One</DemoCheckboxCard>
        <DemoCheckboxCard value="two">Two</DemoCheckboxCard>
        <DemoCheckboxCard value="three">Three</DemoCheckboxCard>
      </Stack>
    </CheckboxGroup>
  )
}
