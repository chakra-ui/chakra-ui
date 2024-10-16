import { DataList as ChakraDataList, IconButton } from "@chakra-ui/react"
import { ToggleTip } from "compositions/ui/toggle-tip"
import { forwardRef } from "react"
import { HiOutlineInformationCircle } from "react-icons/hi2"

export const DataListRoot = ChakraDataList.Root

interface ItemProps extends ChakraDataList.ItemProps {
  label: React.ReactNode
  value: React.ReactNode
  info?: React.ReactNode
  grow?: boolean
}

export const DataListItem = forwardRef<HTMLDivElement, ItemProps>(
  function DataListItem(props, ref) {
    const { label, info, value, children, grow, ...rest } = props
    return (
      <ChakraDataList.Item ref={ref} {...rest}>
        <ChakraDataList.ItemLabel flex={grow ? "1" : undefined}>
          {label}
          {info && (
            <ToggleTip content={info}>
              <IconButton variant="ghost" aria-label="info" size="2xs">
                <HiOutlineInformationCircle />
              </IconButton>
            </ToggleTip>
          )}
        </ChakraDataList.ItemLabel>
        <ChakraDataList.ItemValue flex={grow ? "1" : undefined}>
          {value}
        </ChakraDataList.ItemValue>
        {children}
      </ChakraDataList.Item>
    )
  },
)
