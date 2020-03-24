import {
  chakra,
  css,
  PropsOf,
  Responsive,
  SystemProps,
} from "@chakra-ui/system"
import { getValidChildren, mapResponsive } from "@chakra-ui/utils"
import * as React from "react"
import { FlexOptions } from "./Flex"

type StackDirection = Responsive<"row" | "column">

type StackOptions = Pick<FlexOptions, "align" | "justify" | "wrap"> & {
  /**
   * The space between each stack item
   */
  spacing?: SystemProps["margin"]
  /**
   * The direction to stack the items.
   */
  direction?: StackDirection
  /**
   * If `true`, each stack item will show a divider
   */
  divider?: React.ReactElement
}

export type StackProps = PropsOf<typeof chakra.div> & StackOptions

export type StackDividerProps = PropsOf<typeof chakra.hr>

export const StackDivider = (props: StackDividerProps) => (
  <chakra.hr border="0" alignSelf="stretch" {...props} />
)

export const Stack = React.forwardRef(
  (props: StackProps, ref: React.Ref<any>) => {
    const {
      direction = "column",
      justify = "flex-start",
      align,
      spacing = 2,
      wrap,
      children,
      divider,
      ...rest
    } = props

    const selector = ">*+*"

    const styles: any = {}

    styles.flexDirection = mapResponsive(direction, value =>
      value === "row" ? "row" : "column",
    )

    styles[selector] = mapResponsive(direction, value => ({
      [value === "column" ? "marginTop" : "marginLeft"]: spacing,
      [value === "column" ? "marginLeft" : "marginTop"]: 0,
    }))

    const validChildren = getValidChildren(children)

    const dividerStyles = mapResponsive(direction, value => {
      if (value === "row") {
        return {
          marginX: spacing,
          marginY: 0,
          borderLeft: "1px solid",
          borderBottom: 0,
          width: "auto",
        }
      }
      return {
        marginX: 0,
        marginY: spacing,
        borderLeft: 0,
        borderBottom: "1px solid",
        width: "100%",
      }
    })

    const hasDivider = Boolean(divider)

    const clones = validChildren.map((child, index) => {
      if (!hasDivider) return child

      const isLast = index + 1 === validChildren.length

      if (!isLast) {
        return (
          <React.Fragment key={index}>
            {child}
            {React.cloneElement(divider as React.ReactElement<any>, {
              css: css({ "&": dividerStyles }),
            })}
          </React.Fragment>
        )
      }

      return child
    })

    return (
      <chakra.div
        ref={ref}
        display="flex"
        alignItems={align}
        justifyContent={justify}
        flexDirection={styles.flexDirection}
        flexWrap={wrap}
        css={!hasDivider ? css({ [selector]: styles[selector] }) : undefined}
        {...rest}
      >
        {clones}
      </chakra.div>
    )
  },
)
