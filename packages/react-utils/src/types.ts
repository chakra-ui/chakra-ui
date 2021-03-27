import { Merge } from "@chakra-ui/utils"

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode)

export type StringOrNumber = string | number

export type HTMLProps<T = any> = Omit<
  React.HTMLAttributes<T>,
  "color" | "width" | "height"
> &
  React.RefAttributes<T>

export type PropGetter<T extends HTMLElement = any, P = {}> = (
  props?: Merge<HTMLProps<T>, P>,
  ref?: React.Ref<any> | React.RefObject<any>,
) => Merge<HTMLProps<T>, P>

export type EventKeys =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Space"
  | "Tab"
  | "Backspace"
  | "Control"
  | "Meta"
  | "Home"
  | "End"
  | "PageDown"
  | "PageUp"
  | "Delete"
  | "Escape"
  | " "
  | "Shift"

export type EventKeyMap = Partial<Record<EventKeys, React.KeyboardEventHandler>>
