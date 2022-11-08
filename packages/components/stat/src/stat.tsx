import { createContext } from "@chakra-ui/react-context"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

const [StatStylesProvider, useStatStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `StatStylesContext`,
  errorMessage: `useStatStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Stat />" `,
})

export { useStatStyles }

export interface StatProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Stat"> {}

/**
 * The `Stat` component is used to display some statistics.
 *
 * @see Docs https://chakra-ui.com/docs/components/stat
 */
export const Stat = forwardRef<StatProps, "div">(function Stat(props, ref) {
  const styles = useMultiStyleConfig("Stat", props)
  const statStyles: SystemStyleObject = {
    position: "relative",
    flex: "1 1 0%",
    ...styles.container,
  }

  const { className, children, ...rest } = omitThemingProps(props)

  return (
    <StatStylesProvider value={styles}>
      <chakra.div
        ref={ref}
        {...rest}
        className={cx("chakra-stat", className)}
        __css={statStyles}
      >
        <dl>{children}</dl>
      </chakra.div>
    </StatStylesProvider>
  )
})

Stat.displayName = "Stat"
