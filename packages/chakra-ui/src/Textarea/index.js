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

export default Textarea;

export const ExpandingTextarea = ({
  minHeight = "39px",
  onChange,
  ...props
}) => {
  const [height, setHeight] = useState(0);
  const inputRef = useRef();

  useLayoutEffect(() => {
    setHeight(inputRef.current.scrollHeight);
  }, []);

  const handleDefaultChange = event => {
    setTimeout(() => {
      setHeight("auto");
      setHeight(inputRef.current.scrollHeight);
    }, 0);
    onChange && onChange(event);
  };

  return (
    <Textarea
      rows="1"
      onInput={handleDefaultChange}
      style={{ height, resize: "none", overflow: "hidden", minHeight }}
      ref={inputRef}
      {...props}
    />
  );
};
