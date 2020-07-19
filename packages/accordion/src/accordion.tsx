import { Collapse } from "@chakra-ui/collapse"
import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  createContext,
  cx,
  isFunction,
  Omit,
  ReactNodeOrRenderProp,
  __DEV__,
  Dict,
} from "@chakra-ui/utils"
import * as React from "react"
import {
  AccordionContextProvider,
  useAccordionContext,
  useAccordion,
  useAccordionItem,
  UseAccordionItemProps,
  UseAccordionItemReturn,
  UseAccordionProps,
} from "./use-accordion"

type DivProps = PropsOf<typeof chakra.div>

export type AccordionProps = UseAccordionProps &
  ThemingProps & { animateHeight?: boolean } & Omit<DivProps, "onChange">

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/components/accordion
 */
export const Accordion = React.forwardRef(function Accordion(
  props: AccordionProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Accordion", props)
  const rest = omitThemingProps(props)
  const _className = cx("chakra-accordion", props.className)

  const { children, htmlProps, ...context } = useAccordion(rest)

  const accordionCtx = React.useMemo(() => context, [context])

  return (
    <AccordionContextProvider value={accordionCtx}>
      <StylesProvider value={styles}>
        <chakra.div {...htmlProps} ref={ref} className={_className}>
          {children}
        </chakra.div>
      </StylesProvider>
    </AccordionContextProvider>
  )
})

if (__DEV__) {
  Accordion.displayName = "Accordion"
}

type AccordionItemContext = Omit<UseAccordionItemReturn, "getRootProps">

const [AccordionItemContextProvider, useAccordionItemContext] = createContext<
  AccordionItemContext
>({
  name: "AccordionItemContext",
  errorMessage:
    "useAccordionItemContext: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
})

export type AccordionItemProps = Omit<DivProps, "children"> &
  Omit<UseAccordionItemProps, "context"> & {
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
export const AccordionItem = React.forwardRef(function AccordionItem(
  props: AccordionItemProps,
  ref: React.Ref<any>,
) {
  const { children, className } = props
  const { getRootProps, ...context } = useAccordionItem(props)

  const _className = cx("chakra-accordion__item", className)
  const styles = useStyles()

  return (
    <AccordionItemContextProvider value={context}>
      <chakra.div
        {...getRootProps({ ref })}
        className={_className}
        __css={styles.container}
      >
        {isFunction(children)
          ? children({
              isExpanded: !!context.isOpen,
              isDisabled: !!context.isDisabled,
            })
          : children}
      </chakra.div>
    </AccordionItemContextProvider>
  )
})

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

const StyledButton = chakra("button", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "all 0.2s",
    outline: 0,
  },
})

export type AccordionButtonProps = PropsOf<typeof StyledButton>

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef<AccordionButtonProps>(
  function AccordionButton(props, ref) {
    const _className = cx("chakra-accordion__button", props.className)
    const { getButtonProps } = useAccordionItemContext()
    const buttonProps = getButtonProps({ ...props, ref })
    const styles = useStyles()
    return (
      <StyledButton
        {...buttonProps}
        className={_className}
        __css={styles.button}
      />
    )
  },
)

if (__DEV__) {
  AccordionButton.displayName = "AccordionButton"
}

export type AccordionPanelProps = DivProps

/**
 * AccordionPanel
 *
 * The panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate it's height.
 */
export const AccordionPanel = React.forwardRef(function AccordionPanel(
  props: AccordionPanelProps,
  ref: React.Ref<any>,
) {
  const { reduceMotion } = useAccordionContext()
  const { getPanelProps, isOpen } = useAccordionItemContext()
  /**
   * remove `hidden` prop, 'coz we're using height animation
   */
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
})

if (__DEV__) {
  AccordionPanel.displayName = "AccordionPanel"
}

/**
 * AccordionIcon
 *
 * The icon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */
export function AccordionIcon(props: IconProps) {
  const { isOpen, isDisabled } = useAccordionItemContext()
  const { reduceMotion } = useAccordionContext()

  return (
    <Icon
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      __css={{
        fontSize: "1.25em",
        opacity: isDisabled ? 0.4 : 1,
        transform: isOpen ? "rotate(-180deg)" : undefined,
        transition: reduceMotion ? undefined : "transform 0.2s",
        transformOrigin: "center",
      }}
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
