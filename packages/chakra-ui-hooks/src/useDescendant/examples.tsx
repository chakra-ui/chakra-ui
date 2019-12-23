import React from "react";
import { storiesOf } from "@storybook/react";
import {
  useDescendants,
  useDescendant,
  DescendantsState,
  DescendantsActions,
} from ".";
import { chakra } from "@chakra-ui/system";
import { createContext } from "@chakra-ui/utils";

const stories = storiesOf("useDescendant", module);

function Option({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: string;
}) {
  const { state, actions } = useDescendantsContext();
  const { item, isHighlighted } = useDescendant({ state, actions, value });

  return (
    <chakra.div
      ref={item.ref}
      id={item.id}
      tabIndex={0}
      data-value={value}
      bg={isHighlighted ? "red" : "white"}
      onMouseOver={() => {
        actions.highlight(item);
      }}
      onKeyDown={e => {
        if (e.key === "ArrowDown") {
          actions.next("highlight");
        }
      }}
    >
      {children}
    </chakra.div>
  );
}

const [DescendantsProvider, useDescendantsContext] = createContext<{
  state: DescendantsState;
  actions: DescendantsActions;
}>();

function Select({ children }: { children?: React.ReactNode }) {
  const [state, actions] = useDescendants({ highlightFirstItemOnMount: true });

  console.log(state);

  return (
    <DescendantsProvider value={{ state, actions }}>
      {children}
    </DescendantsProvider>
  );
}

stories.add("Default", () => (
  <Select>
    <Option value="option 1">Option 1</Option>
    <div>
      <div>
        <Option value="option 2">Option 2</Option>
      </div>
      <Option value="option 3">Option 3</Option>
    </div>
  </Select>
));
