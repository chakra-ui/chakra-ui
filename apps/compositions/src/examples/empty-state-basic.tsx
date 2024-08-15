import { EmptyState } from "compositions/ui/empty-state"
import { HiShoppingCart } from "react-icons/hi"

export const EmptyStateBasic = () => {
  return (
    <EmptyState
      icon={<HiShoppingCart />}
      title="Your cart is empty"
      description="Explore our products and add items to your cart"
    />
  )
}
