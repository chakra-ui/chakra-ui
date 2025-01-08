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
  useClipboardStyles,
} from "./clipboard"

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
} from "./clipboard"

export { useClipboard, useClipboardContext } from "@ark-ui/react/clipboard"

export type {
  UseClipboardProps,
  UseClipboardReturn,
} from "@ark-ui/react/clipboard"

export * as Clipboard from "./namespace"
