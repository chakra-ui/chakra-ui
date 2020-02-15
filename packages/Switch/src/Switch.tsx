import React from "react";
import { useCheckbox, CheckboxHookProps } from "@chakra-ui/checkbox";
import { useMergeRefs } from "@chakra-ui/hooks";
import { createChakra, PropsOf } from "@chakra-ui/system";

const Root = createChakra("label");
const Track = createChakra("div", { themeKey: "Switch.Track" });
const Thumb = createChakra("div", { themeKey: "Switch.Thumb" });

export type SwitchProps = CheckboxHookProps & PropsOf<typeof Root>;

export const Switch = React.forwardRef(
  (props: SwitchProps, ref: React.Ref<HTMLInputElement>) => {
    const { state, input, checkbox, htmlProps } = useCheckbox(props);
    const ownRef = useMergeRefs(ref, input.ref);
    return (
      <Root data-chakra-switch="" {...htmlProps}>
        <input
          data-chakra-switch-input=""
          {...input}
          ref={ownRef}
          role="switch"
        />
        <Track data-chakra-switch-track="" {...checkbox}>
          <Thumb
            data-chakra-switch-thumb=""
            data-checked={state.isChecked ? "" : undefined}
            data-hover={state.isHovered ? "" : undefined}
          />
        </Track>
      </Root>
    );
  },
);

export default Switch;
