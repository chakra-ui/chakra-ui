import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  chakra,
  defineStyle,
  forwardRef,
  useRecipe,
} from "../../styled-system"

const fallbackIcon = {
  path: (
    <g stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        fill="none"
        d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      />
      <path
        fill="currentColor"
        strokeLinecap="round"
        d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      />
      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
    </g>
  ),
  viewBox: "0 0 24 24",
}

type Orientation = "vertical" | "horizontal"

export interface IconProps extends HTMLChakraProps<"svg"> {
  orientation?: Orientation
}

/**
 * The Icon component renders as an svg element to help define your own custom components.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon#using-the-icon-component
 */
export const Icon = forwardRef<IconProps, "svg">(function Icon(props, ref) {
  const {
    as: element,
    viewBox,
    color = "currentColor",
    focusable = false,
    children,
    className,
    css: cssProp,
    ...restProps
  } = props

  const iconRecipe = useRecipe("Icon")

  const [variantProps, localProps] = iconRecipe.splitVariantProps(restProps)

  const styles = defineStyle({
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color,
    ...iconRecipe(variantProps),
    ...cssProp,
  })

  const sharedProps: any = {
    ref,
    focusable,
    className: cx("chakra-icon", className),
    css: styles,
  }

  const _viewBox = viewBox ?? fallbackIcon.viewBox

  /**
   * If you're using an icon library like `react-icons`.
   * Note: anyone passing the `as` prop, should manage the `viewBox` from the external component
   */
  if (typeof element !== "string") {
    return <chakra.svg as={element} {...sharedProps} {...localProps} />
  }

  const iconPath = (children ?? fallbackIcon.path) as React.ReactNode

  return (
    <chakra.svg
      verticalAlign="middle"
      viewBox={_viewBox}
      {...sharedProps}
      {...localProps}
    >
      {iconPath}
    </chakra.svg>
  )
})

Icon.displayName = "Icon"
