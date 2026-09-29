export {
  ClipboardControl,
  ClipboardIndicator,
  ClipboardRoot,
  ClipboardRootProvider,
  ClipboardPropsProvider,
  ClipboardTrigger,
  ClipboardInput,
  ClipboardLabel,
  ClipboardValueText,
  ClipboardContext,
  ClipboardCopyText,
  useClipboardStyles,
} from "./clipboard.tsx"

export type {
  ClipboardControlProps,
  ClipboardIndicatorProps,
  ClipboardRootProps,
  ClipboardRootProviderProps,
  ClipboardLabelProps,
  ClipboardValueTextProps,
  ClipboardTriggerProps,
  ClipboardInputProps,
  ClipboardCopyStatusDetails,
} from "./clipboard.tsx"

export { useClipboard, useClipboardContext } from "@ark-ui/react/clipboard"

export type {
  UseClipboardProps,
  UseClipboardReturn,
} from "@ark-ui/react/clipboard"

export * as Clipboard from "./namespace.ts"
