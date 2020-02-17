import React from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableState,
} from "./Editable";
import {
  useEditableInput,
  useEditablePreview,
  useEditableProvider,
} from "./Editable.hook";

export default {
  title: "Editable",
};

export const HookSetup = () => {
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
};

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

export const BaseComponents = () => (
  <Editable defaultValue="testing">
    <EditablePreview />
    <EditableInput />
    <ControlButtons />
  </Editable>
);
