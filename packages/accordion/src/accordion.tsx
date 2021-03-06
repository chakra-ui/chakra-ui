import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { Collapse } from "@chakra-ui/transition"
import {
  createContext,
  cx,
  Omit,
  MaybeRenderProp,
  runIfFn,
  __DEV__,
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

export interface AccordionProps
  extends UseAccordionProps,
    Omit<HTMLChakraProps<"div">, keyof UseAccordionProps>,
    ThemingProps<"Accordion"> {
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
 * @see Docs https://chakra-ui.com/docs/components/accordion
 */
export const Accordion = forwardRef<AccordionProps, "div">(
  ({ children, reduceMotion, ...props }, ref) => {
    const styles = useMultiStyleConfig("Accordion", props)
    const ownProps = omitThemingProps(props)

    const { htmlProps, ...context } = useAccordion(ownProps)

    const ctx = React.useMemo(
      () => ({ ...context, reduceMotion: !!reduceMotion }),
      [context, reduceMotion],
    )

    return (
      <AccordionProvider value={ctx}>
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
  },
)

if (__DEV__) {
  Accordion.displayName = "Accordion"
}

type AccordionItemContext = Omit<UseAccordionItemReturn, "htmlProps">

const [
  AccordionItemProvider,
  useAccordionItemContext,
] = createContext<AccordionItemContext>({
  name: "AccordionItemContext",
  errorMessage:
    "useAccordionItemContext: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
})

export interface AccordionItemProps
  extends Omit<HTMLChakraProps<"div">, keyof UseAccordionItemProps>,
    UseAccordionItemProps {
  children?: MaybeRenderProp<{
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
  (props, ref) => {
    const { children, className } = props
    const { htmlProps, ...context } = useAccordionItem(props)

    const styles = useStyles()
    const containerStyles: SystemStyleObject = {
      ...styles.container,
      overflowAnchor: "none",
    }

    const _context = React.useMemo(() => context, [context])

    return (
      <AccordionItemProvider value={_context}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          className={cx("chakra-accordion__item", className)}
          __css={containerStyles}
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

export interface AccordionButtonProps extends HTMLChakraProps<"button"> {}

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef<AccordionButtonProps, "button">(
  (props, ref) => {
    const { getButtonProps } = useAccordionItemContext()
    const buttonProps = getButtonProps(props, ref)

    const styles = useStyles()
    const buttonStyles: SystemStyleObject = {
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

export interface AccordionPanelProps extends HTMLChakraProps<"div"> {}

/**
 * Accordion panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate its height.
 */
export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
  (props, ref) => {
    const { reduceMotion } = useAccordionContext()
    const { getPanelProps, isOpen } = useAccordionItemContext()

    // remove `hidden` prop, 'coz we're using height animation
    const panelProps = getPanelProps(props, ref)

    const _className = cx("chakra-accordion__panel", props.className)
    const styles = useStyles()

    if (!reduceMotion) {
      delete panelProps.hidden
    }

    const child = (
      <chakra.div {...panelProps} __css={styles.panel} className={_className} />
    )

    if (!reduceMotion) {
      return <Collapse in={isOpen}>{child}</Collapse>
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

  const _className = cx("chakra-accordion__icon", props.className)
  const styles = useStyles()

  const iconStyles: SystemStyleObject = {
    opacity: isDisabled ? 0.4 : 1,
    transform: isOpen ? "rotate(-180deg)" : undefined,
    transition: reduceMotion ? undefined : "transform 0.2s",
    transformOrigin: "center",
    ...styles.icon,
  }

  return (
    <Icon
      viewBox="0 0 24 24"
      aria-hidden
      className={_className}
      __css={iconStyles}
      {...props}
    >
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
