import {
  createContext,
  cx,
  getValidChildren,
  mergeWith,
} from "@chakra-ui/utils"
import { cloneElement } from "react"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  SystemStyleObject,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"

const [InputGroupStylesProvider, useInputGroupStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `InputGroupStylesContext`,
  errorMessage: `useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in "<InputGroup />" `,
})

export { useInputGroupStyles }

export interface InputGroupProps
  extends HTMLChakraProps<"div">,
    SystemRecipeProps<"Input"> {}

export const InputGroup = forwardRef<InputGroupProps, "div">(
  function InputGroup(props, ref) {
    const recipe = useSlotRecipe("Input")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const { children, className, ...rest } = localProps

    const _className = cx("chakra-input__group", className)
    const groupStyles: any = {}

    const validChildren = getValidChildren(children)

    const input: any = styles.field

    validChildren.forEach((child: any) => {
      if (!styles) return

      if (input && child.type.id === "InputLeftElement") {
        groupStyles.paddingStart = input.height ?? input.h
      }

      if (input && child.type.id === "InputRightElement") {
        groupStyles.paddingEnd = input.height ?? input.h
      }

      if (child.type.id === "InputRightAddon") {
        groupStyles.borderEndRadius = 0
      }

      if (child.type.id === "InputLeftAddon") {
        groupStyles.borderStartRadius = 0
      }
    })

    const clones = validChildren.map((child: any) => {
      const [childVariantProps] = recipe.splitVariantProps(child.props)
      const _variantProps = mergeWith({}, variantProps, childVariantProps)
      return child.type.id !== "Input"
        ? cloneElement(child, _variantProps)
        : cloneElement(
            child,
            Object.assign(_variantProps, groupStyles, child.props),
          )
    })

    return (
      <chakra.div
        className={_className}
        ref={ref}
        css={{
          width: "100%",
          display: "flex",
          position: "relative",
          // Parts of inputs override z-index to ensure that they stack correctly on each other
          // Create a new stacking context so that these overrides don't leak out and conflict with other z-indexes
          isolation: "isolate",
          ...styles.group,
        }}
        data-group
        {...rest}
      >
        <InputGroupStylesProvider value={styles}>
          {clones}
        </InputGroupStylesProvider>
      </chakra.div>
    )
  },
)

InputGroup.displayName = "InputGroup"
