import { For, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { LuPackage } from "react-icons/lu"

export const IconWithSizes = () => {
  return (
    <HStack gap="8">
      <For each={["inherit", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <VStack key={size}>
            <Icon size={size} color="fg.muted">
              <LuPackage />
            </Icon>
            <Text textStyle="sm">{size}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  )
}
