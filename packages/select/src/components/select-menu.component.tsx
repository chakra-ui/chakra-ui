import { Box, BoxProps } from "@chakra-ui/layout"
import React from "react"
import { __DEV__ } from "@chakra-ui/utils"
import useSelectMenu from "../hooks/use-select-menu.hook"
import { useSelectContext, useSelectStyles } from "../select"

export interface SelectMenuProps extends BoxProps {
  children: React.ReactNode
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  children,
  ...restProps
}) => {
  const styles = useSelectStyles()
  const { isOpen } = useSelectContext()
  const containerProps = useSelectMenu()

  return (
    <Box
      className="chakra-select__select-menu"
      as="ul"
      __css={styles.menu}
      hidden={!isOpen}
      {...containerProps}
      {...restProps}
    >
      {children}
    </Box>
  )
}

if (__DEV__) {
  SelectMenu.displayName = "SelectMenu"
}
