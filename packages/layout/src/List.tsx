import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import * as React from "react"
import { getValidChildren } from "@chakra-ui/utils"
import { Icon, IconProps } from "@chakra-ui/icon"

const StyledList = chakra("ul")

export type ListProps = PropsOf<typeof StyledList> & {
  styleType?: SystemProps["listStyleType"]
  stylePosition?: SystemProps["listStylePosition"]
  spacing?: SystemProps["margin"]
}

export const List = React.forwardRef(
  (props: ListProps, ref: React.Ref<any>) => {
    const {
      children,
      styleType = "none",
      stylePosition = "inside",
      spacing,
      ...rest
    } = props
    const validChildren = getValidChildren(children)
    return (
      <StyledList
        ref={ref}
        listStyleType={styleType}
        listStylePosition={stylePosition}
        data-chakra-list=""
        {...rest}
      >
        {validChildren.map((child, index) => {
          const isLast = index + 1 === validChildren.length
          if (isLast) return child
          return spacing ? React.cloneElement(child, { mb: spacing }) : child
        })}
      </StyledList>
    )
  },
)

List.displayName = "List"

export const ListItem = chakra("li")
ListItem.displayName = "ListItem"

export const ListIcon = (props: IconProps) => <Icon mr={2} {...props} />
ListIcon.displayName = "ListIcon"
