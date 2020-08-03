import { Select, SelectProps } from "@chakra-ui/core"
import React from "react"

function VersionSwitcher(props: SelectProps) {
  return (
    <Select
      mr="1rem"
      variant="unstyled"
      maxW="88px"
      fontWeight="semibold"
      color="gray.400"
      defaultValue="chakra-ui.com"
      onChange={(e) => {
        window.location.href = e.target.value
      }}
      {...props}
    >
      <option value="chakra-ui.com">v1.0</option>
      <option value="v0.chakra-ui.com">v0.8</option>
    </Select>
  )
}

export default VersionSwitcher
