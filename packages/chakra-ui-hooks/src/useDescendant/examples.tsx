import React from "react";
import { storiesOf } from "@storybook/react";
import {
  useDescendants,
  useDescendant,
  DescendantsState,
  DescendantsActions,
} from ".";
import createCtx from "../useCreateContext";
import { chakra } from "@chakra-ui/system";

const stories = storiesOf("useDescendant", module);

function Option({ children }: { children?: React.ReactNode }) {
  const context = useDescendantsContext();
  const { item, isHighlighted } = useDescendant(context);

  return (
    <chakra.div
      ref={item.ref}
      id={item.id}
      tabIndex={0}
      bg={isHighlighted ? "red" : "white"}
      onMouseOver={() => {
        context.actions.highlight(item);
      }}
      onKeyDown={e => {
        if (e.key === "ArrowDown") {
          context.actions.next("highlight");
        }
      }}
    >
      {children}
    </chakra.div>
  );
}

const [useDescendantsContext, DescendantsProvider] = createCtx<{
  state: DescendantsState;
  actions: DescendantsActions;
}>();

function Select({ children }: { children?: React.ReactNode }) {
  const [state, actions] = useDescendants({ highlightFirstItemOnMount: true });

  return (
    <DescendantsProvider value={{ state, actions }}>
      {children}
    </DescendantsProvider>
  );
}

stories.add("Default", () => (
  <Select>
    <Option>Option 1</Option>
    <div>
      <div>
        <Option>Option 2</Option>
      </div>
      <Option>Option 3</Option>
    </div>
  </Select>
));
