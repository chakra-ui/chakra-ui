import { StyleFunctionProps } from "@chakra-ui/styled-system"

export function mode<T>(light: T, dark: T) {
  return (props: Record<string, any> | StyleFunctionProps) =>
    props.colorMode === "dark" ? dark : light
}
