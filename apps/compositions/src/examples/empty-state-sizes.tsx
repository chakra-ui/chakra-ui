import { For, Stack } from "@chakra-ui/react"
import { EmptyState } from "compositions/ui/empty-state"
import { LuShoppingCart } from "react-icons/lu"

export const EmptyStateSizes = () => {
  return (
    <Stack>
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <EmptyState
            size={size}
            icon={<LuShoppingCart />}
            title="Your cart is empty"
            description="Explore our products and add items to your cart"
          />
        )}
      </For>
    </Stack>
  )
}
