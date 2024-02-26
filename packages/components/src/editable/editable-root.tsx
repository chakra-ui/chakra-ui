import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx, pick, runIfFn } from "@chakra-ui/utils"
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

export type EditableState = Pick<
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
    const styles = useMultiStyleConfig("Editable", props)

    const ownProps = omitThemingProps(props)
    const [hookProps, rootProps] = splitEditableProps(ownProps)

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
            __css={styles.root}
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
