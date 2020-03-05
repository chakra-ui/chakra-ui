import * as React from "react"
import { createChakra } from "@chakra-ui/system"
import { RadioProps, useRadio } from "./Radio.hook"
import useRadioGroup from "./RadioGroup.hook"

const BaseRadioControlBox = createChakra("div", { themeKey: "Radio" })

const BaseRadioInput = React.forwardRef(
  (props: RadioProps, ref: React.Ref<HTMLInputElement>) => {
    const { input } = useRadio(props)
    return <input ref={ref} type="radio" {...input} />
  },
)

export const BaseRadio = (props: RadioProps) => {
  const { checkbox, remaining: rest } = useRadio(props)
  return (
    <label>
      <BaseRadioInput />
      <BaseRadioControlBox
        {...rest}
        {...checkbox}
        variantSize="lg"
        variantColor="blue"
        verticalAlign="top"
        borderRadius="full"
      />
      <span style={{ margin: 10 }}>Option</span>
    </label>
  )
}

export function BaseRadioGroup(props: any) {
  const radio = useRadioGroup(props)
  return (
    <div>
      {["Option 1", "Option 2", "Option 3"].map(opt => (
        <label>
          <input
            type="radio"
            value={opt}
            checked={radio.value === opt}
            onChange={radio.onChange}
            name={radio.name}
          />
          <span style={{ margin: 10 }}>{opt}</span>
        </label>
      ))}
    </div>
  )
}
