import { Box, type BoxProps } from "@chakra-ui/react"

export const DecorativeBox = (props: BoxProps) => (
  <Box
    {...props}
    css={{
      width: "100%",
      height: "100%",
      bg: "bg.emphasized",
      backgroundClip: "padding-box",
      borderWidth: "1px",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
)
