import { For, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { LuPackage } from "react-icons/lu"

export const IconWithSizes = () => {
  return (
    <HStack gap="8">
      <For each={["xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <VStack key={size}>
            <Icon asChild size={size} color="fg.subtle">
              <LuPackage />
            </Icon>
            <Text>{size}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  )
}
