import { NativeSelect as Select } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface NativeSelectRootProps extends Select.RootProps {
  icon?: React.ReactNode
}

export const NativeSelectRoot = forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelect(props, ref) {
  const { icon, children, ...rest } = props
  return (
    <Select.Root ref={ref} {...rest}>
      {children}
      <Select.Indicator>{icon}</Select.Indicator>
    </Select.Root>
  )
})

export const NativeSelectField = Select.Field
