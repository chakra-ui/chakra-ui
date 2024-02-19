import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { runIfFn } from "@chakra-ui/utils/run-if-fn"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { EditableProvider, EditableStylesProvider } from "./editable-context"
import { splitEditableProps } from "./editable-props"
import {
  useEditable,
  UseEditableProps,
  UseEditableReturn,
} from "./use-editable"

type RenderProps = Pick<
  UseEditableReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

type MaybeRenderProp<P> = React.ReactNode | ((props: P) => React.ReactNode)

interface BaseEditableProps
  extends Omit<
    HTMLChakraProps<"div">,
    "onChange" | "value" | "defaultValue" | "onSubmit" | "onBlur"
  > {}

export interface EditableRootProps
  extends UseEditableProps,
    Omit<BaseEditableProps, "children">,
    ThemingProps<"Editable"> {
  children?: MaybeRenderProp<RenderProps>
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
    const styles = useMultiStyleConfig("Editable", props)

    const ownProps = omitThemingProps(props)
    const [hookProps, localProps] = splitEditableProps(ownProps)

    const context = useEditable(hookProps)
    const { isEditing, onSubmit, onCancel, onEdit } = context

    const _className = cx("chakra-editable", props.className)

    const children = runIfFn(props.children, {
      isEditing,
      onSubmit,
      onCancel,
      onEdit,
    })

    return (
      <EditableProvider value={context}>
        <EditableStylesProvider value={styles}>
          <chakra.div ref={ref} {...localProps} className={_className}>
            {children}
          </chakra.div>
        </EditableStylesProvider>
      </EditableProvider>
    )
  },
)

EditableRoot.displayName = "Editable"
