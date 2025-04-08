"use client"

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useMemo,
} from "react"
import {
  type HTMLChakraProps,
  type InferRecipeProps,
  type JsxStyleProps,
  chakra,
} from "../../styled-system"
import { cx, dataAttr } from "../../utils"

const StyledGroup = chakra("div", {
  base: {
    display: "inline-flex",
    gap: "0.5rem",
    isolation: "isolate",
    position: "relative",
    "& [data-group-item]": {
      _focusVisible: {
        zIndex: 1,
      },
    },
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
    attached: {
      true: {
        gap: "0!",
      },
    },
    grow: {
      true: {
        display: "flex",
        "& > *": {
          flex: 1,
        },
      },
    },
    stacking: {
      "first-on-top": {
        "& > [data-group-item]": {
          zIndex: "calc(var(--group-count) - var(--group-index))",
        },
      },
      "last-on-top": {
        "& > [data-group-item]": {
          zIndex: "var(--group-index)",
        },
      },
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      attached: true,
      css: {
        "& > *[data-first]": {
          borderEndRadius: "0!",
          marginEnd: "-1px",
        },
        "& > *[data-between]": {
          borderRadius: "0!",
          marginEnd: "-1px",
        },
        "& > *[data-last]": {
          borderStartRadius: "0!",
        },
      },
    },
    {
      orientation: "vertical",
      attached: true,
      css: {
        "& > *[data-first]": {
          borderBottomRadius: "0!",
          marginBottom: "-1px",
        },
        "& > *[data-between]": {
          borderRadius: "0!",
          marginBottom: "-1px",
        },
        "& > *[data-last]": {
          borderTopRadius: "0!",
        },
      },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
  },
})

type VariantProps = InferRecipeProps<typeof StyledGroup>

export interface GroupProps extends HTMLChakraProps<"div", VariantProps> {
  /**
   * The `alignItems` style property
   */
  align?: JsxStyleProps["alignItems"]
  /**
   * The `justifyContent` style property
   */
  justify?: JsxStyleProps["justifyContent"]
  /**
   * The `flexWrap` style property
   */
  wrap?: JsxStyleProps["flexWrap"]
  /**
   * A function that determines if a child should be skipped
   */
  skip?: (child: React.ReactElement) => boolean
}

export const Group = memo(
  forwardRef<HTMLDivElement, GroupProps>(function Group(props, ref) {
    const {
      align = "center",
      justify = "flex-start",
      children,
      wrap,
      skip,
      ...rest
    } = props

    const _children = useMemo(() => {
      let childArray = Children.toArray(children).filter(isValidElement)
      if (childArray.length === 1) return childArray

      const validChildArray = childArray.filter((child) => !skip?.(child))
      const validChildCount = validChildArray.length
      if (validChildArray.length === 1) return childArray

      return childArray.map((child) => {
        const childProps = child.props as any
        if (skip?.(child)) return child
        const index = validChildArray.indexOf(child)
        return cloneElement(child, {
          ...childProps,
          "data-group-item": "",
          "data-first": dataAttr(index === 0),
          "data-last": dataAttr(index === validChildCount - 1),
          "data-between": dataAttr(index > 0 && index < validChildCount - 1),
          style: {
            "--group-count": validChildCount,
            "--group-index": index,
            ...(childProps?.style ?? {}),
          },
        } as any)
      })
    }, [children, skip])

    return (
      <StyledGroup
        ref={ref}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap}
        {...rest}
        className={cx("chakra-group", props.className)}
      >
        {_children}
      </StyledGroup>
    )
  }),
)
