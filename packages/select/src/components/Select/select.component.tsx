import { Box, useMultiStyleConfig, useOutsideClick } from "@chakra-ui/react"
import React from "react"
import { createContext, MaybeRenderProp } from "@chakra-ui/react-utils"
import { runIfFn } from "@chakra-ui/utils"
import { createStylesContext } from "@chakra-ui/system"
import {
  SelectStyleProps,
  SelectRenderProps,
  SelectControlProps,
  SelectChildrenProps,
} from "./interfaces/select.interface"
import SelectInput from "./components/select-input.component"
import useSelect, { UseSelectReturn } from "./hooks/use-select.hook"

export interface SelectProps
  extends SelectControlProps,
    SelectRenderProps,
    SelectStyleProps {
  children: MaybeRenderProp<SelectChildrenProps>
  name?: string
}

const [StyleProvider, useStyles] = createStylesContext("Select")

const [SelectContextProvider, useSelectContext] =
  createContext<UseSelectReturn>({
    strict: true,
    name: "SelectContext",
    errorMessage:
      "useSelectContext: `context` is undefined. Seems you forgot to wrap select components in `<Select />`",
  })

export { SelectContextProvider, useSelectContext }

export const useSelectStyles = useStyles

const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      name,
      children,
      variant,
      size,
      isDisabled,
      readonly,
      invalid,
      rootProps,
      ...restProps
    },
    forwardRef,
  ) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const { sx, ...restRootProps } = rootProps || {}
    const context = useSelect({ isDisabled, invalid, readonly, ...restProps })

    useOutsideClick({ ref, handler: context.onClose })

    const styles = useMultiStyleConfig("Select", {
      isOpen: context.isOpen,
      variant,
      size,
      isDisabled,
      invalid,
      readonly,
    })

    return (
      <SelectContextProvider value={context}>
        <StyleProvider value={styles}>
          <Box
            ref={ref}
            className="chakra-select chakra-select-wrapper"
            sx={{ ...styles.wrapper, ...sx }}
            {...restRootProps}
          >
            <SelectInput ref={forwardRef} name={name} />
            {runIfFn(children, {
              isOpen: context.isOpen,
              option: context.option,
            })}
          </Box>
        </StyleProvider>
      </SelectContextProvider>
    )
  },
)
Select.displayName = "Select"

export default Select
