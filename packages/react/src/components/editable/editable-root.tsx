"use client"

import { MaybeRenderProp, cx, pick, runIfFn } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { EditableProvider, EditableStylesProvider } from "./editable-context"
import { splitEditableProps } from "./editable-props"
import {
  UseEditableProps,
  UseEditableReturn,
  useEditable,
} from "./use-editable"

export type EditableState = Pick<
  UseEditableReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

interface BaseEditableProps
  extends Omit<
    HTMLChakraProps<"div">,
    "onChange" | "value" | "defaultValue" | "onSubmit" | "onBlur"
  > {}

export interface EditableRootProps
  extends UseEditableProps,
    Omit<BaseEditableProps, "children">,
    SlotRecipeProps<"Editable">,
    UnstyledProp {
  children?: MaybeRenderProp<EditableState>
}

/**
 * Editable
 *
 * The wrapper that provides context and logic for all editable
 * components. It renders a `div`
 *
 * @see Docs https://chakra-ui.com/docs/components/editable
 */
export const EditableRoot = forwardRef<HTMLDivElement, EditableRootProps>(
  function Editable({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Editable", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [hookProps, rootProps] = splitEditableProps(localProps)
    const api = useEditable(hookProps)

    const editableState = pick(api, [
      "isEditing",
      "onSubmit",
      "onCancel",
      "onEdit",
    ])

    const children = runIfFn(props.children, editableState)

    return (
      <EditableProvider value={api}>
        <EditableStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            {...rootProps}
            css={[styles.root, props.css]}
            className={cx("chakra-editable", props.className)}
          >
            {children}
          </chakra.div>
        </EditableStylesProvider>
      </EditableProvider>
    )
  },
)

EditableRoot.displayName = "Editable"
