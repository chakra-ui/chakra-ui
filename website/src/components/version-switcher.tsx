import { Select, SelectProps, useColorModeValue } from "@chakra-ui/core"

// eslint-disable-next-line import/no-default-export
export default function VersionSwitcher(props: SelectProps): JSX.Element {
  return (
    <Select
      mr="1rem"
      variant="unstyled"
      fontWeight="semibold"
      color={useColorModeValue("gray.600", "whiteAlpha.600")}
      defaultValue="next.chakra-ui.com"
      aria-label="Documentation version picker"
      onChange={(e) => {
        window.location.href = e.target.value
      }}
      {...props}
    >
      <option value="next.chakra-ui.com">v1.0</option>
      <option value="chakra-ui.com">v0.8</option>
    </Select>
  )
}
