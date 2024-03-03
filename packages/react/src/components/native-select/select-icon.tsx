import { cx, dataAttr } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useSelectContext, useSelectStyles } from "./select-context"

const Icon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    role="presentation"
    viewBox="0 0 24 24"
    className="chakra-select__icon"
    focusable="false"
    aria-hidden="true"
    {...props}
    style={{
      width: "1em",
      height: "1em",
      color: "currentColor",
    }}
  >
    <path
      fill="currentColor"
      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    />
  </chakra.svg>
)

export interface NativeSelectIconProps extends HTMLChakraProps<"div"> {}

export const NativeSelectIcon: React.FC<NativeSelectIconProps> = (props) => {
  const { asChild, ...rest } = props

  const fieldProps = useSelectContext()
  const styles = useSelectStyles()

  return (
    <chakra.div
      {...rest}
      data-disabled={dataAttr(fieldProps.disabled)}
      className={cx("chakra-select__icon-wrapper", props.className)}
      css={styles.icon}
    >
      <Icon />
    </chakra.div>
  )
}

NativeSelectIcon.displayName = "NativeSelectIcon"
