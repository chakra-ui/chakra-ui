import React from "react";
import { storiesOf } from "@storybook/react";
import useCheckbox, {
  CheckboxProps,
  Checkbox as CheckboxLabel,
  CheckboxInput,
  CustomCheckbox,
  useCheckboxState,
} from "./useCheckbox";
import { chakra, createChakra } from "@chakra-ui/system";

const stories = storiesOf("useCheckbox", module);

const visuallyHiddenStyles: React.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
};

function Checkbox(props: CheckboxProps & { children: React.ReactNode }) {
  const { state, input, checkbox } = useCheckbox(props);
  return (
    <label>
      <input {...input} style={visuallyHiddenStyles} />
      <chakra.div
        {...checkbox}
        _hover={{ bg: "papayawhip" }}
        _focus={{ color: "yellow" }}
        _indeterminate={{ bg: "blue", color: "white" }}
      >
        {state.isChecked && "✔️"} {props.children}{" "}
        {state.isHovered ? "hover" : null}
        {state.isActive ? "active" : null}
      </chakra.div>
    </label>
  );
}

function WithState() {
  const [checked, setChecked] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = true;
  }, []);

  return (
    <>
      <Checkbox
        isIndeterminate
        defaultIsChecked={true}
        onChange={event => {
          console.log(event.target.checked);
          // console.log(event.target.indeterminate);
          // setChecked(event.target.checked);
        }}
      >
        Select Food {String(checked)}
      </Checkbox>
      <input
        type="checkbox"
        ref={ref}
        onChange={event => {
          // console.log(event.target.indeterminate);
          // console.log(event.target.checked);
        }}
      />
    </>
  );
}

stories.add("Native Checkbox", () => <WithState />);

function IndeterminateExample() {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
        children="Parent Checkbox"
      />
      <chakra.div pl="20px" mt="12px">
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}
          children="Child Checkbox 1"
        />
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}
          children="Child Checkbox 2"
        />
      </chakra.div>
    </>
  );
}

stories.add("indeterminate checkbox", () => <IndeterminateExample />);

const CheckIcon = () => {
  const { isChecked } = useCheckboxState();
  return <>{isChecked ? "✔️" : null}</>;
};

const ChakraBox = createChakra(CustomCheckbox);

stories.add("custom components", () => (
  <CheckboxLabel value="male">
    <CheckboxInput />
    <ChakraBox
      display="inline-block"
      size="30px"
      border="1px solid gray"
      color="white"
      _checked={{ bg: "green" }}
      _focus={{ outline: "3px dotted red" }}
    >
      <CheckIcon />
    </ChakraBox>
  </CheckboxLabel>
));
