import { HiCheck, HiOutlineBriefcase, HiX } from "react-icons/hi"
import { Avatar, Box, For, Span, Stack, Tag, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Tag",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Variants = () => {
  const recipe = useSlotRecipe("tag")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>
            {(v) => <td key={v}>{v}</td>}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <Stack align="flex-start">
                      <Tag.Root variant={v} colorPalette={c}>
                        <Tag.Label>Gray</Tag.Label>
                      </Tag.Root>

                      <Tag.Root variant={v} colorPalette={c}>
                        <Tag.Label>Gray</Tag.Label>
                        <Tag.CloseTrigger>
                          <HiX />
                        </Tag.CloseTrigger>
                      </Tag.Root>

                      <Tag.Root variant={v} colorPalette={c}>
                        <HiCheck />
                        <Tag.Label>Gray</Tag.Label>
                      </Tag.Root>

                      <Tag.Root variant={v} colorPalette={c}>
                        <HiOutlineBriefcase />
                        <Tag.Label>Projects</Tag.Label>
                      </Tag.Root>

                      <Tag.Root
                        variant={v}
                        colorPalette={c}
                        borderRadius="full"
                      >
                        <Avatar.Root size="xs">
                          <Avatar.Image src="https://bit.ly/dan-abramov" />
                          <Avatar.Fallback>DA</Avatar.Fallback>
                        </Avatar.Root>
                        <Tag.Label> Dan Abramov</Tag.Label>
                      </Tag.Root>
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
  const recipe = useSlotRecipe("tag")
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
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td key={v}>
                    <Tag.Root size={v} colorPalette={c}>
                      <Tag.Label>Gray</Tag.Label>
                      <Tag.CloseTrigger>
                        <HiX />
                      </Tag.CloseTrigger>
                    </Tag.Root>
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

export const Overflow = () => {
  return (
    <Tag.Root size="sm" colorPalette="blue" maxW="200px">
      <Tag.Label>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        molestias, laboriosam, quod, quia quidem quae voluptatem natus
        exercitationem autem quibusdam
      </Tag.Label>
      <Tag.CloseTrigger>
        <HiX />
      </Tag.CloseTrigger>
    </Tag.Root>
  )
}
