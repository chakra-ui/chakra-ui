import { MaybeRenderProp } from "@chakra-ui/react-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx, runIfFn, __DEV__ } from "@chakra-ui/utils"
import { EditableProvider, EditableStylesProvider } from "./editable-context"
import {
  useEditable,
  UseEditableProps,
  UseEditableReturn,
} from "./use-editable"

type RenderProps = Pick<
  UseEditableReturn,
  "isEditing" | "onSubmit" | "onCancel" | "onEdit"
>

interface BaseEditableProps
  extends Omit<
    HTMLChakraProps<"div">,
    "onChange" | "value" | "defaultValue" | "onSubmit"
  > {}

export interface EditableProps
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
 */
export const Editable = forwardRef<EditableProps, "div">(function Editable(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Editable", props)

  const ownProps = omitThemingProps(props)
  const { htmlProps, ...context } = useEditable(ownProps)

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
        <chakra.div
          ref={ref}
          {...(htmlProps as HTMLChakraProps<"div">)}
          className={_className}
        >
          {children}
        </chakra.div>
      </EditableStylesProvider>
    </EditableProvider>
  )
})

if (__DEV__) {
  Editable.displayName = "Editable"
}
