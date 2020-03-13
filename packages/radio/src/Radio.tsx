import { createChakra, PropsOf, SystemProps, chakra } from "@chakra-ui/system"
import { Omit } from "@chakra-ui/utils"
import * as React from "react"
import { RadioProps, useRadio } from "./Radio.hook"

const ControlBox = createChakra("div", { themeKey: "Radio" })

type OmittedRadioProps = Omit<
  PropsOf<typeof ControlBox>,
  "onChange" | "defaultChecked"
>

type CustomRadioProps = OmittedRadioProps &
  Omit<PropsOf<"input">, "size" | "defaultValue" | "value"> &
  RadioProps & {
    iconColor?: any
    iconSize?: SystemProps["size"]
  }

export const Radio = React.forwardRef(
  (props: CustomRadioProps, ref: React.Ref<HTMLInputElement>) => {
    const { state, input, checkbox, remaining: rest } = useRadio(props)

    return (
      <label>
        <input {...input} ref={ref} />
        <ControlBox
          variantSize="lg"
          variantColor="blue"
          verticalAlign="top"
          borderRadius="full"
          {...checkbox}
          {...rest}
        >
          {state.isChecked && (
            <chakra.span bg="currentColor" borderRadius="full" size="50%" />
          )}
        </ControlBox>
        {props.children && (
          <chakra.div
            ml={2}
            fontSize={props.variantSize}
            userSelect="none"
            opacity={props.isDisabled ? 0.4 : 1}
          >
            {props.children}
          </chakra.div>
        )}
      </label>
    )
  },
)
