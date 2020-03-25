import { chakra, PropsOf, ChakraProps } from "@chakra-ui/system"

export interface GridOptions {
  templateColumns?: ChakraProps["gridTemplateColumns"]
  gap?: ChakraProps["gridGap"]
  rowGap?: ChakraProps["gridRowGap"]
  columnGap?: ChakraProps["gridColumnGap"]
  autoFlow?: ChakraProps["gridAutoFlow"]
  autoRows?: ChakraProps["gridAutoRows"]
  autoColumns?: ChakraProps["gridAutoColumns"]
  templateRows?: ChakraProps["gridTemplateRows"]
  templateAreas?: ChakraProps["gridTemplateAreas"]
  area?: ChakraProps["gridArea"]
  column?: ChakraProps["gridColumn"]
  row?: ChakraProps["gridRow"]
}

export type GridProps = PropsOf<typeof Grid>

export const Grid = chakra<"div", GridOptions>("div", {
  baseStyle: props => ({
    display: "grid",
    gridArea: props.area,
    gridTemplateAreas: props.templateAreas,
    gridGap: props.gap,
    gridRowGap: props.rowGap,
    gridColumnGap: props.columnGap,
    gridAutoColumns: props.autoColumns,
    gridColumn: props.column,
    gridRow: props.row,
    gridAutoFlow: props.autoFlow,
    gridAutoRows: props.autoRows,
    gridTemplateRows: props.templateRows,
    gridTemplateColumns: props.templateColumns,
  }),
})
