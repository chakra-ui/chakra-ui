import { dataAttr } from "@chakra-ui/utils"
import { Children, cloneElement, forwardRef, isValidElement, memo } from "react"
import { HTMLChakraProps, InferRecipeProps, chakra } from "../../styled-system"

const StyledGroup = chakra("div", {
  base: {
    display: "inline-flex",
    gap: "0.5rem",
    isolation: "isolate",
    position: "relative",
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
        "& > *:not([data-first]):not([data-last])": {
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
        "& > *:not([data-first]):not([data-last])": {
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

interface GroupProps extends HTMLChakraProps<"div", VariantProps> {}

export const Group = memo(
  forwardRef<HTMLDivElement, GroupProps>(function Group(props, ref) {
    const count = Children.count(props.children)
    const clones = Children.map(props.children, (child, index) => {
      if (!isValidElement(child)) {
        throw new Error(
          "chakra-ui: Group expects children to be valid elements",
        )
      }
      return cloneElement(child, {
        ...child.props,
        "data-first": dataAttr(index === 0),
        "data-last": dataAttr(index === count - 1),
      } as any)
    })

    return (
      <StyledGroup ref={ref} {...props}>
        {clones}
      </StyledGroup>
    )
  }),
)
