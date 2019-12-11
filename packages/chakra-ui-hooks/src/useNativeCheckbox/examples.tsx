import React from "react";
import { storiesOf } from "@storybook/react";
import useNativeCheckbox, {
  UseNativeCheckboxOptions,
} from "./useNativeCheckbox";

const stories = storiesOf("useNativeCheckbox", module);

function NativeCheckbox(
  props: UseNativeCheckboxOptions & { children: React.ReactNode },
) {
  const { hiddenCheckbox, checkbox } = useNativeCheckbox(props);
  return (
    <label>
      <input {...hiddenCheckbox} />
      <span {...checkbox}>{props.children}</span>
    </label>
  );
}

function WithState() {
  const [checked, setChecked] = React.useState<any>(true);
  return (
    <NativeCheckbox defaultIsChecked={true} onChange={setChecked}>
      Select Food {String(checked)}
    </NativeCheckbox>
  );
}

stories.add("Native Checkbox", () => <WithState />);
