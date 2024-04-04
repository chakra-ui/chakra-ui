import { HiCheck, HiOutlineBriefcase, HiX } from "react-icons/hi"
import { Avatar, Box, For, Span, Stack, Tag } from "../src"
import { useSlotRecipe } from "../src/styled-system"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Tag",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Variants = () => {
  const recipe = useSlotRecipe("Tag")
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
                          <Avatar.Fallback name="Dan Abrahmov" />
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
  const recipe = useSlotRecipe("Tag")
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

// export const WithStartIcon = () => (
//   <Tag.Root colorScheme="cyan">
//     <Icon as={HiPlus} w="12px" h="12px" />
//     <Tag.Label>Green</Tag.Label>
//   </Tag.Root>
// )

// export const WithEndIcon = () => (
//   <Tag.Root colorScheme="cyan">
//     <Tag.Label>Green</Tag.Label>
//     <Icon as={HiPlus} w="12px" h="12px" />
//   </Tag.Root>
// )

// export const WithCloseTrigger = () => (
//   <>
//     <Tag.Root variant="solid" size="sm" colorScheme="cyan">
//       <Tag.Label>Tab Label</Tag.Label>
//       <Tag.CloseTrigger />
//     </Tag.Root>

//     <Tag.Root variant="solid" size="md" colorScheme="cyan">
//       <Tag.Label>Tab Label</Tag.Label>
//       <Tag.CloseTrigger />
//     </Tag.Root>

//     <Tag.Root variant="solid" size="lg" colorScheme="cyan">
//       <Tag.Label>Tab Label</Tag.Label>
//       <Tag.CloseTrigger />
//     </Tag.Root>
//   </>
// )

// export const WithCustomElement = () => (
//   <Tag.Root size="lg" colorScheme="red" borderRadius="full">
//     <Avatar.Root
//       src="https://bit.ly/sage-adebayo"
//       size="xs"
//       name="Segun Adebayo"
//       marginLeft={-1}
//       marginRight={2}
//     >
//       <Avatar.Image />
//       <Avatar.Fallback />
//     </Avatar.Root>
//     <Tag.Label>Segun</Tag.Label>
//     <Tag.CloseTrigger />
//   </Tag.Root>
// )
