import { MaybeRenderProp, cx, pick, runIfFn } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
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
    SystemRecipeProps<"Editable"> {
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
export const EditableRoot = forwardRef<EditableRootProps, "div">(
  function Editable(props, ref) {
    const recipe = useSlotRecipe("Editable")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

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
            css={styles.root}
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
