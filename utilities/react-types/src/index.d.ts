export interface AriaLabelingProps {
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
  "aria-details"?: string
}

export interface AriaValidationProps {
  "aria-errormessage"?: string
}

export interface IdProps {
  id?: string
}

export interface InputDOMEvents {
  onCopy?: React.ClipboardEventHandler<HTMLInputElement>
  onCut?: React.ClipboardEventHandler<HTMLInputElement>
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>
  onCompositionUpdate?: React.CompositionEventHandler<HTMLInputElement>
  onSelect?: React.ReactEventHandler<HTMLInputElement>
  onBeforeInput?: React.FormEventHandler<HTMLInputElement>
  onInput?: React.FormEventHandler<HTMLInputElement>
}

export interface InputDOMProps extends IdProps, InputDOMEvents {
  autoComplete?: string
  maxLength?: number
  minLength?: number
  name?: string
  pattern?: string
  placeholder?: string
  type?:
    | "text"
    | "search"
    | "url"
    | "tel"
    | "email"
    | "password"
    | "hidden"
    | (string & {})
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
}

interface DOMElement extends Element, HTMLOrSVGElement {}

type DataAttributes = {
  [dataAttr: string]: any
}

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string
    role?: React.AriaRole
    tabIndex?: number
    style?: React.CSSProperties
  }

export type InputDOMAttributes = InputDOMProps & DOMAttributes<HTMLInputElement>

type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>,
) => R & React.RefAttributes<any>

export type RequiredPropGetter<
  P = Record<string, unknown>,
  R = DOMAttributes,
> = (
  props: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>,
) => R & React.RefAttributes<any>

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode)
