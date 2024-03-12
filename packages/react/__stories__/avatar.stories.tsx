import { Avatar, Box, For, HStack, Span, Stack, useSlotRecipe } from "../src"
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

export const Variants = () => {
  const recipe = useSlotRecipe("Avatar")
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
                        <Avatar.Fallback name="Dan Abrahmov" />
                      </Avatar.Root>

                      <Avatar.Root colorPalette={c} variant={v}>
                        <Avatar.Fallback name="Dan Abrahmov" />
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
  const recipe = useSlotRecipe("Avatar")
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
                        <Avatar.Fallback name="Dan Abrahmov" />
                      </Avatar.Root>

                      <Avatar.Root colorPalette={c} size={v}>
                        <Avatar.Fallback name="Dan Abrahmov" />
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

export const WithAvatarGroup = () => {
  const recipe = useSlotRecipe("Avatar")
  return (
    <Stack gap="24px">
      <For each={recipe.variantMap.size}>
        {(size) => (
          <Avatar.Group size={size} key={size}>
            <Avatar.Root>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
              <Avatar.Fallback name="Uchica Sasuke" />
            </Avatar.Root>

            <Avatar.Root>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
              <Avatar.Fallback name="User B" />
            </Avatar.Root>

            <Avatar.Root>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
              <Avatar.Fallback name="User C" />
            </Avatar.Root>

            <Avatar.Root>
              <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar.Root>
          </Avatar.Group>
        )}
      </For>
    </Stack>
  )
}
