import { Collapse } from "@chakra-ui/collapse"
import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  PropsOf,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  cx,
  createContext,
  Omit,
  ReactNodeOrRenderProp,
  runIfFn,
  __DEV__,
  Dict,
} from "@chakra-ui/utils"
import * as React from "react"
import {
  AccordionProvider,
  useAccordion,
  useAccordionContext,
  useAccordionItem,
  UseAccordionItemProps,
  UseAccordionItemReturn,
  UseAccordionProps,
} from "./use-accordion"

interface DivProps extends PropsOf<typeof chakra.div> {}

export interface AccordionProps
  extends UseAccordionProps,
    Omit<DivProps, keyof UseAccordionProps>,
    ThemingProps {
  /**
   * If `true`, height animation and transitions will be disabled.
   */
  reduceMotion?: boolean
}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/components/accordion
 */
export const Accordion = forwardRef<AccordionProps, "div">(function Accordion(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Accordion", props)
  const _props = omitThemingProps(props)

  const { children, htmlProps, ...context } = useAccordion(_props)

  const _context = React.useMemo(
    () => ({ ...context, reduceMotion: !!props.reduceMotion }),
    [context, props.reduceMotion],
  )

  return (
    <AccordionProvider value={_context}>
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          className={cx("chakra-accordion", props.className)}
        >
          {children}
        </chakra.div>
      </StylesProvider>
    </AccordionProvider>
  )
})

if (__DEV__) {
  Accordion.displayName = "Accordion"
}

type AccordionItemContext = Omit<UseAccordionItemReturn, "htmlProps">

const [AccordionItemProvider, useAccordionItemContext] = createContext<
  AccordionItemContext
>({
  name: "AccordionItemContext",
  errorMessage:
    "useAccordionItemContext: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
})

export interface AccordionItemProps
  extends Omit<DivProps, keyof UseAccordionItemProps>,
    UseAccordionItemProps {
  children?: ReactNodeOrRenderProp<{
    isExpanded: boolean
    isDisabled: boolean
  }>
}

/**
 * AccordionItem is a single accordion that provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = forwardRef<AccordionItemProps, "div">(
  function AccordionItem(props, ref) {
    const { children, className } = props
    const { htmlProps, ...context } = useAccordionItem(props)

    const styles = useStyles()
    const _context = React.useMemo(() => context, [context])

    return (
      <AccordionItemProvider value={_context}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          className={cx("chakra-accordion__item", className)}
          __css={styles.container}
        >
          {runIfFn(children, {
            isExpanded: !!context.isOpen,
            isDisabled: !!context.isDisabled,
          })}
        </chakra.div>
      </AccordionItemProvider>
    )
  },
)

if (__DEV__) {
  AccordionItem.displayName = "AccordionItem"
}

/**
 * React hook to get the state and actions of an accordion item
 */
export function useAccordionItemState() {
  const { isOpen, isDisabled, onClose, onOpen } = useAccordionItemContext()
  return { isOpen, onClose, isDisabled, onOpen }
}

export interface AccordionButtonProps extends PropsOf<typeof chakra.button> {}

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef<AccordionButtonProps, "button">(
  function AccordionButton(props, ref) {
    const { getButtonProps } = useAccordionItemContext()
    const buttonProps = getButtonProps(props, ref)

    const styles = useStyles()
    const buttonStyles = {
      display: "flex",
      alignItems: "center",
      width: "100%",
      transition: "all 0.2s",
      outline: 0,
      ...styles.button,
    }

    return (
      <chakra.button
        {...buttonProps}
        className={cx("chakra-accordion__button", props.className)}
        __css={buttonStyles}
      />
    )
  },
)

if (__DEV__) {
  AccordionButton.displayName = "AccordionButton"
}

export type AccordionPanelProps = DivProps

/**
 * Accordion panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate it's height.
 */
export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
  function AccordionPanel(props, ref) {
    const { reduceMotion } = useAccordionContext()
    const { getPanelProps, isOpen } = useAccordionItemContext()

    // remove `hidden` prop, 'coz we're using height animation
    const { hidden, ...panelProps } = getPanelProps({ ...props, ref }) as Dict

    const _className = cx("chakra-accordion__panel", props.className)
    const styles = useStyles()

    if (reduceMotion == true) {
      panelProps.hidden = hidden
    }

    const child = (
      <chakra.div
        {...panelProps}
        __css={styles.panel}
        className={_className}
        transition="height 150ms ease-in-out, opacity 150ms ease-in-out, transform 150ms ease-in-out"
      />
    )

    if (reduceMotion == false) {
      return <Collapse isOpen={isOpen}>{child}</Collapse>
    }

    return child
  },
)

if (__DEV__) {
  AccordionPanel.displayName = "AccordionPanel"
}

/**
 * AccordionIcon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */
export const AccordionIcon: React.FC<IconProps> = (props) => {
  const { isOpen, isDisabled } = useAccordionItemContext()
  const { reduceMotion } = useAccordionContext()

  const iconStyles = {
    fontSize: "1.25em",
    opacity: isDisabled ? 0.4 : 1,
    transform: isOpen ? "rotate(-180deg)" : undefined,
    transition: reduceMotion ? undefined : "transform 0.2s",
    transformOrigin: "center",
  }

  return (
    <Icon viewBox="0 0 24 24" aria-hidden __css={iconStyles} {...props}>
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  )
}

if (__DEV__) {
  AccordionIcon.displayName = "AccordionIcon"
}
