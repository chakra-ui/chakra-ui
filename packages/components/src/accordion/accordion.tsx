import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "../system"
import { cx } from "@chakra-ui/utils"
import { useMemo } from "react"
import { AccordionStylesProvider } from "./accordion-context"
import {
  AccordionProvider,
  useAccordion,
  UseAccordionProps,
} from "./use-accordion"
import { useMergeRefs } from "@chakra-ui/hooks"

export interface AccordionProps<Multiple extends boolean>
  extends UseAccordionProps<Multiple>,
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
export const Accordion = forwardRef(function Accordion<
  Multiple extends boolean,
>(
  { children, reduceMotion, ...props }: AccordionProps<Multiple>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const styles = useMultiStyleConfig("Accordion", props)
  const ownProps = omitThemingProps(props)

  const { htmlProps, ...context } = useAccordion(ownProps)

  const ctx = useMemo(
    () => ({ ...context, reduceMotion: !!reduceMotion }),
    [context, reduceMotion],
  )

  return (
    <AccordionProvider value={ctx}>
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
    </AccordionProvider>
  )
}) as (<Multiple extends boolean = false>(
  props: AccordionProps<Multiple> & {
    ref?: React.ForwardedRef<HTMLDivElement>
  },
) => React.ReactElement) & {
  displayName?: string
}

Accordion.displayName = "Accordion"
