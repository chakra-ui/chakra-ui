"use client"

import { Dialog as ArkDialog, useDialogContext } from "@ark-ui/react/dialog"
import { chakra, createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { dialog } from "@chakra-ui/styled-system/recipes"
import { type ComponentProps, forwardRef } from "react"

const { withProvider, withContext } = createSlotRecipeContext(dialog)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(ArkDialog.Root, "trigger")

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider(ArkDialog.RootProvider, "trigger")

export type TriggerProps = ComponentProps<typeof Trigger>
export const Trigger = withContext(ArkDialog.Trigger, "trigger")

export type BackdropProps = ComponentProps<typeof Backdrop>
export const Backdrop = withContext(ArkDialog.Backdrop, "backdrop")

export type PositionerProps = ComponentProps<typeof Positioner>
export const Positioner = withContext(ArkDialog.Positioner, "positioner")

export type ContentProps = ComponentProps<typeof Content>
export const Content = withContext(ArkDialog.Content, "content")

export type TitleProps = ComponentProps<typeof Title>
export const Title = withContext(ArkDialog.Title, "title")

export type DescriptionProps = ComponentProps<typeof Description>
export const Description = withContext(ArkDialog.Description, "description")

export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>
export const CloseTrigger = withContext(ArkDialog.CloseTrigger, "closeTrigger")

export type HeaderProps = ComponentProps<typeof Header>
export const Header = withContext(chakra.div, "header")

export type BodyProps = ComponentProps<typeof Body>
export const Body = withContext(chakra.div, "body")

export type FooterProps = ComponentProps<typeof Footer>
export const Footer = withContext(chakra.div, "footer")

export interface ActionTriggerProps extends ComponentProps<
  typeof chakra.button
> {}

export const ActionTrigger = forwardRef<HTMLButtonElement, ActionTriggerProps>(
  function ActionTrigger(props, ref) {
    const dialog = useDialogContext()
    return (
      <chakra.button
        {...props}
        ref={ref}
        onClick={() => dialog.setOpen(false)}
      />
    )
  },
)

export { DialogContext as Context } from "@ark-ui/react/dialog"
