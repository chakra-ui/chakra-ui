/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { forwardRef, useRef, useState, useLayoutEffect } from "react";
import Input from "./Input";
import { themeGet } from "@styled-system/theme-get";

const StyledTextarea = styled(Input)(props => ({
  paddingTop: 8,
  paddingBottom: 8,
  lineHeight: themeGet(`lineHeights.short`)(props),
  minHeight: 80
}));

const Textarea = forwardRef((props, ref) => {
  return <StyledTextarea ref={ref} as="textarea" {...props} />;
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
