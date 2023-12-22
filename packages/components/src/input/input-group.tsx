import {
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { getValidChildren } from "@chakra-ui/utils/children"
import { compact } from "@chakra-ui/utils/compact"
import { createContext } from "@chakra-ui/utils/context"
import { cx } from "@chakra-ui/utils/cx"
import { cloneElement } from "react"

const [InputGroupStylesProvider, useInputGroupStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `InputGroupStylesContext`,
  errorMessage: `useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in "<InputGroup />" `,
})

export { useInputGroupStyles }

export interface InputGroupProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Input"> {}

export const InputGroup = forwardRef<InputGroupProps, "div">(
  function InputGroup(props, ref) {
    const styles = useMultiStyleConfig("Input", props)
    const { children, className, ...rest } = omitThemingProps(props)

    const _className = cx("chakra-input__group", className)
    const groupStyles: InputGroupProps = {}

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
      /**
       * Make it possible to override the size and variant from `Input`
       */

      const theming = compact({
        size: child.props?.size || props.size,
        variant: child.props?.variant || props.variant,
      })

      return child.type.id !== "Input"
        ? cloneElement(child, theming)
        : cloneElement(child, Object.assign(theming, groupStyles, child.props))
    })

    return (
      <chakra.div
        className={_className}
        ref={ref}
        __css={{
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
