import { storiesOf } from "@storybook/react";
import React from "react";
import setup from "../story.setup";
import {
  useEditableProvider,
  useEditableInput,
  useEditablePreview,
} from "./Editable.hook";
import {
  useEditableState,
  Editable,
  EditablePreview,
  EditableInput,
} from "./Editable";

const stories = storiesOf("useEditable", module).addDecorator(setup);

stories.add("hook ", () => {
  function Example() {
    const context = useEditableProvider({
      placeholder: "Title",
      isPreviewFocusable: true,
      submitOnBlur: true,
    });
    const input = useEditableInput({ context });
    const preview = useEditablePreview({ context });

    return (
      <>
        <input style={{ width: "100%" }} {...input} />
        <span style={{ opacity: !context.value ? 0.7 : 1 }} {...preview} />
        {!context.isEditing && <button onClick={context.onEdit}>Edit</button>}
      </>
    );
  }

  return <Example />;
});

const ControlButtons = () => {
  const state = useEditableState();
  return (
    <div>
      {!state.isEditing ? (
        <button onClick={state.onEdit}>Edit</button>
      ) : (
        <>
          <button onClick={state.onSubmit}>Save</button>
          <button onClick={state.onCancel}>Cancel</button>
        </>
      )}
    </div>
  );
};

stories.add("component", () => (
  <Editable defaultValue="testing">
    <EditablePreview />
    <EditableInput />
    <ControlButtons />
  </Editable>
));
