import React from "react";
import { storiesOf } from "@storybook/react";
import {
  EditableProvider,
  useEditableInput,
  useEditablePreview,
  useEditableState,
} from "./useEditable";
import setup from "../story.setup";

const stories = storiesOf("useEditable", module).addDecorator(setup);

function EditableInput(props: any) {
  const input = useEditableInput(props);
  return <input {...input} />;
}

function EditablePreview(props: any) {
  const { value, placeholder, isValueEmpty, ...preview } = useEditablePreview(
    props,
  );
  return <span {...preview}>{isValueEmpty ? placeholder : value}</span>;
}

function EditControls() {
  const { onEdit, isEditing } = useEditableState();
  return <>{!isEditing && <button onClick={onEdit}>Edit</button>}</>;
}

stories.add("Default", () => (
  <EditableProvider
    placeholder="Welcome"
    submitOnBlur
    isPreviewFocusable
    onChange={val => console.log(val)}
  >
    <EditableInput />
    <EditablePreview />
    <EditControls />
  </EditableProvider>
));
