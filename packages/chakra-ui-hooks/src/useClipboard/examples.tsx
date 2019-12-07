import React from "react";
import { storiesOf } from "@storybook/react";
import useClipboard from "./useClipboard";

const stories = storiesOf("useClipboard", module);

function CliboardExample() {
  const [name, setName] = React.useState<string>();
  const { onCopy, hasCopied } = useClipboard(name);

  return (
    <div>
      <input
        value={name}
        placeholder="Enter your name here"
        onChange={e => setName(e.target.value)}
      />
      <button
        onClick={() => {
          onCopy();
          setName("");
        }}
      >
        {hasCopied ? "Copied" : "Copy Name"}
      </button>
      <input placeholder="Paste copied text" />
    </div>
  );
}

stories.add("Clipboard", () => <CliboardExample />);
