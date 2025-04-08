import { DataList as ChakraDataList } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"
import * as React from "react"

export const DataListRoot = ChakraDataList.Root

interface ItemProps extends ChakraDataList.ItemProps {
  label: React.ReactNode
  value: React.ReactNode
  info?: React.ReactNode
  grow?: boolean
}

export const DataListItem = React.forwardRef<HTMLDivElement, ItemProps>(
  function DataListItem(props, ref) {
    const { label, info, value, children, grow, ...rest } = props
    return (
      <ChakraDataList.Item ref={ref} {...rest}>
        <ChakraDataList.ItemLabel flex={grow ? "1" : undefined}>
          {label}
          {info && <InfoTip>{info}</InfoTip>}
        </ChakraDataList.ItemLabel>
        <ChakraDataList.ItemValue flex={grow ? "1" : undefined}>
          {value}
        </ChakraDataList.ItemValue>
        {children}
      </ChakraDataList.Item>
    )
  },
)
