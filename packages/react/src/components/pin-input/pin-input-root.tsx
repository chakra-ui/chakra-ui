import { useMergeRefs } from "@chakra-ui/hooks"
import { cx, getValidChildren } from "@chakra-ui/utils"
import { cloneElement } from "react"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  SystemStyleObject,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"
import { PinInputProvider } from "./pin-input-context"
import { splitPinInputProps } from "./pin-input-props"
import { UsePinInputProps, usePinInput } from "./use-pin-input"

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
}

export interface PinInputRootProps
  extends HTMLChakraProps<"div", UsePinInputProps>,
    SystemRecipeProps<"PinInput">,
    InputOptions {
  /**
   * Spacing between each of the input fields
   * @type SystemStyleObject["margin"]
   * @default "0.5rem"
   */
  spacing?: SystemStyleObject["margin"]
}

/**
 * The `PinInput` component is similar to the Input component, but is optimized for entering sequences of digits quickly.
 *
 * @see Docs https://chakra-ui.com/docs/components/pin-input
 */
export const PinInputRoot = forwardRef<PinInputRootProps, "div">(
  function PinInput(props, ref) {
    const recipe = useRecipe("PinInput")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [hookProps, restProps] = splitPinInputProps(localProps)
    const context = usePinInput(hookProps)

    const clones = getValidChildren(restProps.children).map((child, index) =>
      cloneElement(child, { __css: styles, index: index }),
    )

    const { spacing = "0.5rem", ...containerProps } = restProps

    return (
      <PinInputProvider value={context}>
        <chakra.div
          ref={useMergeRefs(ref, context.containerRef)}
          {...containerProps}
          className={cx("chakra-pin-input", props.className)}
          css={{
            display: "inline-flex",
            alignItems: "center",
            gap: spacing,
          }}
        >
          {clones}
        </chakra.div>
      </PinInputProvider>
    )
  },
)

PinInputRoot.displayName = "PinInputRoot"
