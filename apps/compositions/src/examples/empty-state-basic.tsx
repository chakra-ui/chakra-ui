import { EmptyState } from "compositions/ui/empty-state"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateBasic = () => {
  return (
    <EmptyState
      icon={<HiColorSwatch />}
      title="No template found"
      description="Try creating a new template with the button below"
    />
  )
}
