/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import Input from "../Input";

const Textarea = forwardRef((props, ref) => {
  return (
    <Input
      py="8px"
      minHeight="80px"
      lineHeight="short"
      ref={ref}
      as="textarea"
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;

export const ExpandingTextarea = forwardRef(
  ({ minHeight = "39px", onInput, ...props }, ref) => {
    const [height, setHeight] = useState(0);
    const ownRef = useRef();

    const textareaRef = ref || ownRef;

    useLayoutEffect(() => {
      if (textareaRef.current) {
        setHeight(textareaRef.current.scrollHeight);
      }
    }, [textareaRef]);

    const handleInput = event => {
      if (textareaRef.current) {
        setTimeout(() => {
          setHeight("auto");
          setHeight(textareaRef.current.scrollHeight);
        }, 0);
      }
      onInput && onInput(event);
    };

    return (
      <Textarea
        rows="1"
        onInput={handleInput}
        css={{ height, resize: "none", overflow: "hidden", minHeight }}
        ref={textareaRef}
        {...props}
      />
    );
  },
);

ExpandingTextarea.displayName = "ExpandingTextarea";
