import React from "react";
import { useCheckbox } from "@chakra-ui/checkbox";
import { useMergeRefs } from "@chakra-ui/hooks";
import { PropsOf } from "@chakra-ui/system";

const BaseSwitch = React.forwardRef(
  (props: any, ref: React.Ref<HTMLInputElement>) => {
    const { state, input, checkbox, htmlProps } = useCheckbox(props);
    const ownRef = useMergeRefs(ref, input.ref);
    return (
      <label {...htmlProps}>
        <input {...input} ref={ownRef} />
        <div {...checkbox}>
          <div />
        </div>
      </label>
    );
  },
);
