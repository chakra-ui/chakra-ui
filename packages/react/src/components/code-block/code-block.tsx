"use client"

import { type Assign, type HTMLArkProps } from "@ark-ui/react"
import { useClipboard } from "@ark-ui/react/clipboard"
import { ark } from "@ark-ui/react/factory"
import { forwardRef, useId, useMemo } from "react"
import { useControllableState } from "../../hooks"
import { mergeProps } from "../../merge-props"
import {
  type HTMLChakraProps,
  type RecipeVariantProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { cx, dataAttr } from "../../utils"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, CopyIcon } from "../icons"
import { useCodeBlockAdapterContext } from "./code-block-adapter-context"
import {
  CodeBlockContextProvider,
  type UseCodeBlockContext,
  useCodeBlockContext,
} from "./code-block-context"
import { codeBlockSlotRecipe } from "./code-block-recipe"
import type { CodeBlockColorScheme, CodeBlockHighlighterProps } from "./types"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCodeBlockStyles,
  PropsProvider,
} = createSlotRecipeContext({
  key: "codeBlock",
  recipe: codeBlockSlotRecipe,
})

export { useCodeBlockStyles }

////////////////////////////////////////////////////////////////////////////////////

interface SharedRootProps extends CodeBlockHighlighterProps {
  /**
   * The maximum number of lines to show.
   * @default undefined
   */
  maxLines?: number | undefined
  /**
   * The fallback color scheme for the code block.
   * @default "dark"
   */
  defaultColorScheme?: CodeBlockColorScheme | undefined
  /**
   * The timeout for the copy action.
   * @default 1000
   */
  copyTimeout?: number | undefined
  /**
   * The callback function that is called when the copy action is completed.
   */
  onCopy?: VoidFunction | undefined
}

interface RootBaseProps extends Assign<HTMLArkProps<"div">, SharedRootProps> {}

const RootBase = forwardRef<HTMLDivElement, RootBaseProps>(
  function RootBase(props, ref) {
    const {
      children,
      code: codeProp,
      language,
      meta: metaProp,
      maxLines,
      defaultColorScheme = "dark",
      copyTimeout = 1000,
      onCopy,
      ...rest
    } = props

    const meta = useMemo(
      () => ({
        ...metaProp,
        colorScheme: metaProp?.colorScheme ?? defaultColorScheme,
      }),
      [metaProp, defaultColorScheme],
    )

    const code = codeProp.trim()
    const codeLines = code.split("\n").length

    const clipboard = useClipboard({
      value: code,
      timeout: copyTimeout,
      onStatusChange(details) {
        if (details.copied) onCopy?.()
      },
    })

    const [collapsed, setCollapsed] = useControllableState({
      defaultValue: maxLines != null ? codeLines > maxLines : false,
    })

    const uid = useId()

    const collapsible = useMemo(
      () => ({
        contentId: `${uid}-content`,
        collapsed,
        setCollapsed,
        toggleCollapsed: () => setCollapsed((prev) => !prev),
      }),
      [collapsed, setCollapsed, uid],
    )

    const context = useMemo(
      () => ({
        code,
        language,
        clipboard,
        collapsible,
        meta,
      }),
      [code, language, clipboard, collapsible, meta],
    )

    return (
      <CodeBlockContextProvider value={context}>
        <ark.div
          ref={ref}
          data-has-focused={dataAttr(Boolean(meta?.focusedLineNumbers?.length))}
          data-has-diff={dataAttr(
            Boolean(meta?.addedLineNumbers?.length) ||
              Boolean(meta?.removedLineNumbers?.length),
          )}
          data-has-line-numbers={dataAttr(Boolean(meta?.showLineNumbers))}
          {...rest}
          className={cx("chakra-theme", meta.colorScheme, rest.className)}
          style={{
            ...rest.style,
            ["--code-block-line-length" as string]: `${String(codeLines).length}ch`,
          }}
        >
          {children}
        </ark.div>
      </CodeBlockContextProvider>
    )
  },
)

type CodeBlockRecipeProps = RecipeVariantProps<typeof codeBlockSlotRecipe>

export interface CodeBlockRootBaseProps
  extends Assign<
      Omit<HTMLChakraProps<"div">, "lang" | keyof SharedRootProps>,
      // SlotRecipeProps<"codeBlock">
      CodeBlockRecipeProps
    >,
    UnstyledProp,
    SharedRootProps {}

export interface CodeBlockRootProps extends CodeBlockRootBaseProps {
  children: React.ReactNode
}

export const CodeBlockRoot = withProvider<HTMLDivElement, CodeBlockRootProps>(
  RootBase,
  "root",
  { forwardAsChild: true, forwardProps: ["maxLines"] },
)

////////////////////////////////////////////////////////////////////////////////////

export const CodeBlockPropsProvider =
  PropsProvider as React.Provider<CodeBlockRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

const ContentBase = forwardRef<HTMLDivElement, HTMLArkProps<"div">>(
  function ContentBase(props, ref) {
    const { children, ...restProps } = props
    const { collapsible } = useCodeBlockContext()
    return (
      <ark.div
        ref={ref}
        id={collapsible.contentId}
        data-expanded={dataAttr(!collapsible.collapsed)}
        aria-expanded={!collapsible.collapsed}
        {...restProps}
      >
        {children}
      </ark.div>
    )
  },
)

export interface CodeBlockContentProps extends HTMLChakraProps<"div"> {}

export const CodeBlockContent = withContext<
  HTMLDivElement,
  CodeBlockContentProps
>(ContentBase, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockTitleProps extends HTMLChakraProps<"div"> {}

export const CodeBlockTitle = withContext<HTMLDivElement, CodeBlockTitleProps>(
  "div",
  "title",
)

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockHeaderProps extends HTMLChakraProps<"div"> {}

export const CodeBlockHeader = withContext<
  HTMLDivElement,
  CodeBlockHeaderProps
>("header", "header")

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockCodeProps extends HTMLChakraProps<"pre"> {}

export const CodeBlockCode = withContext<HTMLPreElement, CodeBlockCodeProps>(
  "pre",
  "code",
  {
    defaultProps: {
      tabIndex: 0,
    },
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockCodeTextProps extends HTMLChakraProps<"code"> {}

const CodeText = forwardRef<HTMLElement, CodeBlockCodeTextProps>(
  function CodeText(props: any, ref) {
    const { code, language, meta } = useCodeBlockContext()

    const { highlight } = useCodeBlockAdapterContext()
    const highlighted = highlight?.({ code, language, meta })

    const codeContentProps = highlighted?.highlighted
      ? { dangerouslySetInnerHTML: { __html: highlighted.code } }
      : { children: code }

    return (
      <ark.code
        data-plaintext={dataAttr(!highlighted?.highlighted)}
        data-has-focused={dataAttr(Boolean(meta?.focusedLineNumbers?.length))}
        data-has-diff={dataAttr(
          Boolean(meta?.addedLineNumbers?.length) ||
            Boolean(meta?.removedLineNumbers?.length),
        )}
        data-has-line-numbers={dataAttr(Boolean(meta?.showLineNumbers))}
        data-word-wrap={dataAttr(Boolean(meta?.wordWrap))}
        ref={ref}
        {...props}
        {...codeContentProps}
      />
    )
  },
)

export const CodeBlockCodeText = withContext<
  HTMLElement,
  CodeBlockCodeTextProps
>(CodeText, "codeText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockCopyTriggerProps extends HTMLChakraProps<"button"> {}

const BaseCopyTrigger = forwardRef<HTMLButtonElement, HTMLArkProps<"button">>(
  function BaseCopyTrigger(props, ref) {
    const { children, ...restProps } = props
    const { clipboard } = useCodeBlockContext()
    return (
      <ark.button
        ref={ref}
        {...mergeProps(clipboard.getTriggerProps(), restProps)}
      >
        {children}
      </ark.button>
    )
  },
)

export const CodeBlockCopyTrigger = withContext<
  HTMLButtonElement,
  CodeBlockCopyTriggerProps
>(BaseCopyTrigger, "copyTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

interface BaseCopyIndicatorBaseProps {
  copied?: React.ReactNode
  children?: React.ReactNode
}

interface BaseCopyIndicatorProps
  extends Assign<HTMLArkProps<"span">, BaseCopyIndicatorBaseProps> {}

const BaseCopyIndicator = forwardRef<HTMLDivElement, BaseCopyIndicatorProps>(
  function BaseCopyIndicator(props, ref) {
    const { children, copied, ...restProps } = props

    const { clipboard } = useCodeBlockContext()
    return (
      <ark.span ref={ref} {...restProps}>
        {clipboard.copied ? copied : children}
      </ark.span>
    )
  },
)

export interface CodeBlockCopyIndicatorProps
  extends Assign<HTMLChakraProps<"span">, BaseCopyIndicatorBaseProps> {}

export const CodeBlockCopyIndicator = withContext<
  HTMLDivElement,
  CodeBlockCopyIndicatorProps
>(BaseCopyIndicator, "indicator", {
  forwardAsChild: true,
  defaultProps: {
    copied: <CheckIcon boxSize="1em" />,
    children: <CopyIcon boxSize="1em" />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

// collapse trigger and indicator

const BaseCollapseTrigger = forwardRef<
  HTMLButtonElement,
  HTMLArkProps<"button">
>(function BaseCollapseTrigger(props, ref) {
  const { children, ...restProps } = props
  const { collapsible } = useCodeBlockContext()
  return (
    <ark.button
      type="button"
      aria-controls={collapsible.contentId}
      aria-expanded={!collapsible.collapsed}
      aria-label={
        collapsible.collapsed ? "Expand code block" : "Collapse code block"
      }
      ref={ref}
      {...restProps}
      onClick={(e) => {
        restProps.onClick?.(e)
        collapsible.toggleCollapsed()
      }}
    >
      {children}
    </ark.button>
  )
})

export interface CodeBlockCollapseTriggerProps
  extends HTMLChakraProps<"button"> {}

export const CodeBlockCollapseTrigger = withContext<
  HTMLButtonElement,
  CodeBlockCollapseTriggerProps
>(BaseCollapseTrigger, "collapseTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

interface BaseCollapseIndicatorBaseProps {
  collapsed?: React.ReactNode
  children?: React.ReactNode
}

const BaseCollapseIndicator = forwardRef<
  HTMLDivElement,
  HTMLArkProps<"span"> & BaseCollapseIndicatorBaseProps
>(function BaseCollapseIndicator(props, ref) {
  const { children, collapsed, ...restProps } = props
  const { collapsible } = useCodeBlockContext()
  return (
    <ark.span ref={ref} {...restProps}>
      {collapsible.collapsed ? collapsed : children}
    </ark.span>
  )
})

export interface CodeBlockCollapseIndicatorProps
  extends Assign<HTMLChakraProps<"span">, BaseCollapseIndicatorBaseProps> {}

export const CodeBlockCollapseIndicator = withContext<
  HTMLDivElement,
  CodeBlockCollapseIndicatorProps
>(BaseCollapseIndicator, "collapseIndicator", {
  forwardAsChild: true,
  defaultProps: {
    collapsed: <ChevronDownIcon boxSize="1em" />,
    children: <ChevronUpIcon boxSize="1em" />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockCollapseTextProps extends HTMLChakraProps<"span"> {}

export const CodeBlockCollapseText = forwardRef<
  HTMLDivElement,
  CodeBlockCollapseTextProps
>(function CodeBlockCollapseText(props, ref) {
  return (
    <CodeBlockCollapseIndicator ref={ref} {...props} collapsed="Expand code">
      {props.children || "Collapse code"}
    </CodeBlockCollapseIndicator>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockFooterProps extends HTMLChakraProps<"div"> {}

export const CodeBlockFooter = withContext<
  HTMLDivElement,
  CodeBlockFooterProps
>("footer", "footer")

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockControlProps extends HTMLChakraProps<"div"> {}

export const CodeBlockControl = withContext<
  HTMLDivElement,
  CodeBlockControlProps
>("div", "control")

////////////////////////////////////////////////////////////////////////////////////

const BaseOverlay = forwardRef<HTMLDivElement, HTMLArkProps<"div">>(
  function BaseOverlay(props, ref) {
    const { collapsible } = useCodeBlockContext()
    return (
      <ark.div
        ref={ref}
        {...props}
        data-expanded={dataAttr(!collapsible.collapsed)}
      />
    )
  },
)

export interface CodeBlockOverlayProps extends HTMLChakraProps<"div"> {}

export const CodeBlockOverlay = withContext<
  HTMLDivElement,
  CodeBlockOverlayProps
>(BaseOverlay, "overlay", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CodeBlockContextProps {
  children(ctx: UseCodeBlockContext): React.ReactNode
}

export const CodeBlockContext = (props: CodeBlockContextProps) => {
  return props.children(useCodeBlockContext())
}
