export {
  FloatingPanelRoot,
  FloatingPanelRootProvider,
  FloatingPanelPropsProvider,
  FloatingPanelTrigger,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelHeader,
  FloatingPanelBody,
  FloatingPanelTitle,
  FloatingPanelDragTrigger,
  FloatingPanelResizeTrigger,
  FloatingPanelResizeTriggers,
  FloatingPanelStageTrigger,
  FloatingPanelCloseTrigger,
  FloatingPanelControl,
  useFloatingPanelStyles,
} from "./floating-panel.tsx"

export type {
  FloatingPanelRootProps,
  FloatingPanelRootProviderProps,
  FloatingPanelRootBaseProps,
  FloatingPanelRootProviderBaseProps,
  FloatingPanelTriggerProps,
  FloatingPanelPositionerProps,
  FloatingPanelContentProps,
  FloatingPanelHeaderProps,
  FloatingPanelBodyProps,
  FloatingPanelTitleProps,
  FloatingPanelDragTriggerProps,
  FloatingPanelResizeTriggerProps,
  FloatingPanelStageTriggerProps,
  FloatingPanelCloseTriggerProps,
  FloatingPanelControlProps,
} from "./floating-panel.tsx"

export {
  useFloatingPanel,
  useFloatingPanelContext,
  FloatingPanelContext,
} from "@ark-ui/react/floating-panel"

export type {
  UseFloatingPanelProps,
  UseFloatingPanelReturn,
  FloatingPanelOpenChangeDetails,
  FloatingPanelPositionChangeDetails,
  FloatingPanelSizeChangeDetails,
  FloatingPanelStageChangeDetails,
} from "@ark-ui/react/floating-panel"

export * as FloatingPanel from "./namespace.ts"
