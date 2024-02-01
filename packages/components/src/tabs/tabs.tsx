import {
  SystemStyleObject,
  ThemingProps,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
import { createContext } from "@chakra-ui/utils/context"
import { cx } from "@chakra-ui/utils/cx"
import { useMemo } from "react"
import { TabsProvider, UseTabsProps, useTabs } from "./use-tabs"
import { useMergeRefs } from "@chakra-ui/hooks/use-merge-refs"

const [TabsStylesProvider, useTabsStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TabsStylesContext`,
  errorMessage: `useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tabs />" `,
})

export { useTabsStyles }

interface TabsOptions {
  /**
   * If `true`, tabs will stretch to width of the tablist.
   * @default false
   */
  isFitted?: boolean
  /**
   * The alignment of the tabs
   */
  align?: "start" | "end" | "center"
}

export interface TabsProps
  extends UseTabsProps,
    ThemingProps<"Tabs">,
    Omit<HTMLChakraProps<"div">, "onChange" | "defaultValue">,
    TabsOptions {
  children: React.ReactNode
}

/**
 * Tabs
 *
 * Provides context and logic for all tabs components.
 *
 * @see Docs https://chakra-ui.com/docs/components/tabs
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
export const Tabs = forwardRef<TabsProps, "div">(function Tabs(props, ref) {
  const styles = useMultiStyleConfig("Tabs", props)
  const { children, className, ...rest } = omitThemingProps(props)

  const { htmlProps, ...ctx } = useTabs(rest)
  const context = useMemo(() => ctx, [ctx])

  const { isFitted: _, ...rootProps } = htmlProps as any

  const tabsStyles: SystemStyleObject = {
    position: "relative",
    ...styles.root,
  }

  return (
    <TabsProvider value={context}>
      <TabsStylesProvider value={styles}>
        <chakra.div
          className={cx("chakra-tabs", className)}
          ref={useMergeRefs(ref, context.rootRef)}
          {...rootProps}
          __css={tabsStyles}
        >
          {children}
        </chakra.div>
      </TabsStylesProvider>
    </TabsProvider>
  )
})

Tabs.displayName = "Tabs"
