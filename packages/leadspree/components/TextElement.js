/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const TextElement = ({ value, style, onChange, isEditMode, ...rest }) => {
  if (isEditMode) {
    return (
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={html => onChange(html)}
        css={css`
          .ql-container {
            font-family: inherit;
            font-size: inherit;
          }
          .ql-editor {
            padding: 0;
            line-height: inherit;
          }
        `}
      />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: value }}
      suppressContentEditableWarning={true}
    />
  );
};

export default TextElement;
