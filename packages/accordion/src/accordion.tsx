import { Collapse } from "@chakra-ui/collapse"
import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  createContext,
  Omit,
  ReactNodeOrRenderProp,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"
import React, { Ref, useMemo } from "react"
import {
  AccordionContextProvider,
  useAccordion,
  useAccordionContext,
  useAccordionItem,
  UseAccordionItemProps,
  UseAccordionItemReturn,
  UseAccordionProps,
} from "./use-accordion"

type DivProps = PropsOf<typeof chakra.div>

export type AccordionProps = UseAccordionProps &
  Omit<DivProps, "onChange"> &
  ThemingProps & {
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
export const Accordion = React.forwardRef(function Accordion(
  props: AccordionProps,
  ref: Ref<any>,
) {
  const styles = useMultiStyleConfig("Accordion", props)
  const _props = omitThemingProps(props)

  const { children, htmlProps, ...context } = useAccordion(_props)

  const ctx = useMemo(
    () => ({ ...context, reduceMotion: !!props.reduceMotion }),
    [context, props.reduceMotion],
  )

  return (
    <AccordionContextProvider value={ctx}>
      <StylesProvider value={styles}>
        <chakra.div ref={ref} {...htmlProps}>
          {children}
        </chakra.div>
      </StylesProvider>
    </AccordionContextProvider>
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
  ref: Ref<any>,
) {
  const { children } = props
  const { htmlProps, ...context } = useAccordionItem(props)

  const styles = useStyles()
  const _context = useMemo(() => context, [context])

  return (
    <AccordionItemProvider value={_context}>
      <chakra.div ref={ref} {...htmlProps} __css={styles.container}>
        {runIfFn(children, {
          isExpanded: !!context.isOpen,
          isDisabled: !!context.isDisabled,
        })}
      </chakra.div>
    </AccordionItemProvider>
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

export type AccordionButtonProps = PropsOf<typeof chakra.button>

/**
 * AccordionButton is used expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef<AccordionButtonProps>(
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

    return <chakra.button {...buttonProps} __css={buttonStyles} />
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
export const AccordionPanel = React.forwardRef(function AccordionPanel(
  props: AccordionPanelProps,
  ref: Ref<any>,
) {
  const { reduceMotion } = useAccordionContext()

  const { getPanelProps, isOpen } = useAccordionItemContext()
  const panelProps = getPanelProps(props, ref)

  if (reduceMotion) {
    delete panelProps.hidden
  }

  const styles = useStyles()

  const child = <chakra.div {...panelProps} __css={styles.panel} />

  return reduceMotion ? child : <Collapse isOpen={isOpen}>{child}</Collapse>
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
