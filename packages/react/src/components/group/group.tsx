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
import { dataAttr } from "../../utils"

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
}

export const Group = memo(
  forwardRef<HTMLDivElement, GroupProps>(function Group(props, ref) {
    const {
      align = "center",
      justify = "flex-start",
      children,
      wrap,
      ...rest
    } = props

    const count = Children.count(children)

    const _children = useMemo(() => {
      const childArray = Children.toArray(children).filter(
        isValidElement,
      ) as React.ReactElement<any, any>[]

      return childArray.map((child, index) => {
        const childProps = child.props as any
        return cloneElement(child, {
          ...childProps,
          "data-group-item": "",
          "data-first": dataAttr(index === 0),
          "data-last": dataAttr(index === count - 1),
          "data-between": dataAttr(index > 0 && index < count - 1),
          style: {
            "--group-count": count,
            "--group-index": index,
            ...(childProps?.style ?? {}),
          },
        } as any)
      })
    }, [children, count])

    return (
      <StyledGroup
        ref={ref}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap}
        {...rest}
      >
        {_children}
      </StyledGroup>
    )
  }),
)
