import {
  ColorMode,
  ColorModeContext,
  ThemeProvider,
  useChakra,
} from "@chakra-ui/system"
import defaultTheme from "@chakra-ui/theme"
import { ToastProvider, ToastProviderProps } from "./toast.provider"
import { UseToastOptions } from "./use-toast"
import { createToastFn, CreateToastFnReturn } from "./toast"

const defaults: UseToastOptions = {
  duration: 5000,
  variant: "solid",
}

export interface CreateStandAloneToastParam
  extends Partial<
      ReturnType<typeof useChakra> & {
        setColorMode: (value: ColorMode) => void
        defaultOptions: UseToastOptions
      }
    >,
    Omit<ToastProviderProps, "children"> {}

export const defaultStandaloneParam: CreateStandAloneToastParam &
  Required<Omit<CreateStandAloneToastParam, keyof ToastProviderProps>> = {
  theme: defaultTheme,
  colorMode: "light",
  toggleColorMode: () => {},
  setColorMode: () => {},
  defaultOptions: defaults,
  forced: false,
}

export type CreateStandaloneToastReturn = {
  ToastContainer: () => JSX.Element
  toast: CreateToastFnReturn
}

/**
 * Create a toast
 */
export function createStandaloneToast({
  theme = defaultStandaloneParam.theme,
  colorMode = defaultStandaloneParam.colorMode,
  toggleColorMode = defaultStandaloneParam.toggleColorMode,
  setColorMode = defaultStandaloneParam.setColorMode,
  defaultOptions = defaultStandaloneParam.defaultOptions,
  motionVariants,
  toastSpacing,
  component,
  forced,
}: CreateStandAloneToastParam = defaultStandaloneParam): CreateStandaloneToastReturn {
  const colorModeContextValue = {
    colorMode,
    setColorMode,
    toggleColorMode,
    forced,
  }
  const ToastContainer = () => (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorModeContextValue}>
        <ToastProvider
          defaultOptions={defaultOptions}
          motionVariants={motionVariants}
          toastSpacing={toastSpacing}
          component={component}
        />
      </ColorModeContext.Provider>
    </ThemeProvider>
  )

  return {
    ToastContainer,
    toast: createToastFn(theme.direction, defaultOptions),
  }
}
