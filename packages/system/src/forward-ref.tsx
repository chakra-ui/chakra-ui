/**
 * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
 * for creating the base type definitions upon which we improved on
 */
import * as React from "react"

type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>

type Intersection<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps

export type ComponentWithAs<
  Component extends React.ElementType,
  Props extends object = {}
> = {
  <AliasedComponent extends React.ElementType>(
    props: Intersection<React.ComponentProps<Component>, Props> &
      Intersection<React.ComponentProps<AliasedComponent>, Props> & {
        as?: AliasedComponent
      },
  ): JSX.Element

  displayName?: string
  propTypes?: React.WeakValidationMap<any>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<any>
  id?: string
}

export function forwardRef<
  Props extends object,
  Component extends React.ElementType
>(component: React.ForwardRefRenderFunction<any, any>) {
  return (React.forwardRef(component) as unknown) as ComponentWithAs<
    Component,
    Props
  >
}
