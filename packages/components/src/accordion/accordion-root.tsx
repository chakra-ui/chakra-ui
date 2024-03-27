import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { useMergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { useMemo } from "react"
import {
  AccordionContextProvider,
  AccordionStylesProvider,
} from "./accordion-context"
import { useAccordion, UseAccordionProps } from "./use-accordion"

export interface AccordionRootProps
  extends UseAccordionProps,
    Omit<HTMLChakraProps<"div">, keyof UseAccordionProps>,
    ThemingProps<"Accordion"> {
  /**
   * If `true`, height animation and transitions will be disabled.
   *
   * @default false
   */
  reduceMotion?: boolean
}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/accordion
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export const AccordionRoot = forwardRef<AccordionRootProps, "div">(
  function AccordionRoot({ children, reduceMotion, ...props }, ref) {
    const styles = useMultiStyleConfig("Accordion", props)
    const ownProps = omitThemingProps(props)

    const { htmlProps, ...context } = useAccordion(ownProps)

    const ctx = useMemo(
      () => ({ ...context, reduceMotion: !!reduceMotion }),
      [context, reduceMotion],
    )

    return (
      <AccordionContextProvider value={ctx}>
        <AccordionStylesProvider value={styles}>
          <chakra.div
            ref={useMergeRefs(ref, context.rootRef)}
            {...htmlProps}
            className={cx("chakra-accordion", props.className)}
            __css={styles.root}
          >
            {children}
          </chakra.div>
        </AccordionStylesProvider>
      </AccordionContextProvider>
    )
  },
)

AccordionRoot.displayName = "AccordionRoot"
