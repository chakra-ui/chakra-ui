import {
  Avatar,
  Box,
  Circle,
  Float,
  For,
  Group,
  HStack,
  Span,
  Stack,
  useSlotRecipe,
} from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Avatar",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return (
    <Avatar.Root colorPalette="pink" variant="subtle">
      <Avatar.Fallback>DA</Avatar.Fallback>
    </Avatar.Root>
  )
}

export const WithBadge = () => {
  return (
    <Avatar.Root colorPalette="green" variant="subtle">
      <Avatar.Fallback>DA</Avatar.Fallback>
      <Float placement="bottom-end" offsetX="1" offsetY="1">
        <Circle
          bg="green.500"
          size="8px"
          outline="0.2em solid"
          outlineColor="bg"
        />
      </Float>
    </Avatar.Root>
  )
}

export const Variants = () => {
  const recipe = useSlotRecipe("avatar")
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
                    <HStack>
                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Image src="https://bit.ly/dan-abramov" />
                        <Avatar.Fallback>DA</Avatar.Fallback>
                      </Avatar.Root>

                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Fallback>DA</Avatar.Fallback>
                      </Avatar.Root>

                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Icon />
                      </Avatar.Root>
                    </HStack>
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
  const recipe = useSlotRecipe("avatar")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
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
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <HStack>
                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Image src="https://bit.ly/dan-abramov" />
                        <Avatar.Fallback>DA</Avatar.Fallback>
                      </Avatar.Root>

                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Fallback>DA</Avatar.Fallback>
                      </Avatar.Root>

                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Fallback>
                          <Avatar.Icon />
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </HStack>
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

export const Grouped = () => {
  const recipe = useSlotRecipe("avatar")
  return (
    <Stack gap="24px">
      <For each={recipe.variantMap.size}>
        {(size) => (
          <Group gap="0" spaceX="var(--avatar-margin)" key={size}>
            <Avatar.Root size={size}>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
              <Avatar.Fallback>US</Avatar.Fallback>
            </Avatar.Root>

            <Avatar.Root size={size}>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
              <Avatar.Fallback>BA</Avatar.Fallback>
            </Avatar.Root>

            <Avatar.Root size={size}>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
              <Avatar.Fallback>UC</Avatar.Fallback>
            </Avatar.Root>

            <Avatar.Root size={size} variant="solid">
              <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar.Root>
          </Group>
        )}
      </For>
    </Stack>
  )
}
