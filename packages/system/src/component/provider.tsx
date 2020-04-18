import { createContext, split } from "@chakra-ui/utils"
import { ThemingProps } from "../styled.types"
import { useThemeDefaultProps } from "../hooks"

const [ThemingProvider, useThemingContext] = createContext<ThemingProps>({
  strict: false,
  name: "ComponentTheme",
})

export { ThemingProvider, useThemingContext }

/**
 * React hook to split themings and component props from
 * the props passed. It also includes the component's
 * default theming props.
 *
 * @param props the component props
 * @param themeKey the theme key of the component
 */
export function useSplitThemingProps<P extends ThemingProps>(
  props: P,
  themeKey: string,
) {
  const defaults = useThemeDefaultProps(themeKey)

  const [themingProps, componentProps] = split(props, [
    "variant",
    "colorScheme",
    "size",
    "orientation",
  ])

  const computedThemingProps = { ...defaults, ...themingProps }

  return [computedThemingProps, componentProps] as const
}
