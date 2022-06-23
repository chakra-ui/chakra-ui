import { Box, BoxProps } from "@chakra-ui/react"
import React from "react"
import { SystemStyleObject } from "@chakra-ui/styled-system"
import useSelectMenu from "../hooks/use-select-menu.hook"
import { useSelectContext, useSelectStyles } from "../select.component"

export interface SelectMenuProps extends BoxProps {
  children: React.ReactNode
  rootStyles?: SystemStyleObject
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  children,
  sx,
  rootStyles,
  ...restProps
}) => {
  const styles = useSelectStyles()
  const { isOpen } = useSelectContext()
  const containerProps = useSelectMenu()

  return (
    <Box
      className="chakra-select__select-menu"
      as="ul"
      sx={{ ...styles.menu, ...sx }}
      {...containerProps}
      {...restProps}
    >
      {isOpen && children}
    </Box>
  )
}

export default SelectMenu
