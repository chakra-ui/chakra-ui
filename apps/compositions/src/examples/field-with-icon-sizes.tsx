import { Field, For, HStack, VStack } from "@chakra-ui/react"

export const FieldWithIconSizes = () => {
  return (
    <HStack wrap="wrap" gap="8">
      <For each={["xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <VStack key={size}>
            <Field.Root invalid>
              <Field.ErrorText width={"100%"}>
                <Field.ErrorIcon size={size} />
                {size}
              </Field.ErrorText>
            </Field.Root>
          </VStack>
        )}
      </For>
    </HStack>
  )
}
