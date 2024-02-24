import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import { useMemo } from "react"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import {
  AccordionContextProvider,
  AccordionDescendantsProvider,
  AccordionStylesProvider,
} from "./accordion-context"
import { splitAccordionProps } from "./accordion-props"
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
  function Accordion({ children, reduceMotion, ...props }, ref) {
    const ownProps = omitThemingProps(props)

    const styles = useMultiStyleConfig("Accordion", props)

    const [accordionProps, localProps] = splitAccordionProps(ownProps)

    const { descendants, ...context } = useAccordion(accordionProps)

    const ctx = useMemo(
      () => ({ ...context, reduceMotion: !!reduceMotion }),
      [context, reduceMotion],
    )

    return (
      <AccordionDescendantsProvider value={descendants}>
        <AccordionContextProvider value={ctx}>
          <AccordionStylesProvider value={styles}>
            <chakra.div
              ref={ref}
              {...localProps}
              className={cx("chakra-accordion", props.className)}
              __css={styles.root}
            >
              {children}
            </chakra.div>
          </AccordionStylesProvider>
        </AccordionContextProvider>
      </AccordionDescendantsProvider>
    )
  },
)

AccordionRoot.displayName = "Accordion"
