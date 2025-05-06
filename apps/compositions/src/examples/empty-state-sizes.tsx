import { EmptyState, For, Stack, VStack } from "@sh3yk0-ui/react"
import { LuShoppingCart } from "react-icons/lu"

export const EmptyStateSizes = () => {
  return (
    <Stack>
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <EmptyState.Root size={size} key={size}>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <LuShoppingCart />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Your cart is empty</EmptyState.Title>
                <EmptyState.Description>
                  Explore our products and add items to your cart
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </For>
    </Stack>
  )
}
