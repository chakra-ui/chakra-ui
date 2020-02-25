/** @jsx jsx */
import { jsx } from "@emotion/core";
import { cloneElement } from "react";
import Box from "../Box";
import Input from "../Input";
import { inputSizes } from "../Input/styles";
import { InputLeftElement, InputRightElement } from "../InputElement";
import { useTheme } from "../ThemeProvider";
import { cleanChildren } from "../utils";

const InputGroup = ({ children, size = "md", ...props }) => {
  const { sizes } = useTheme();
  const height = inputSizes[size] && inputSizes[size]["height"];
  let pl = null;
  let pr = null;
  const validChildren = cleanChildren(children);
  return (
    <Box display="flex" position="relative" {...props}>
      {validChildren.map(child => {
        if (child.type === InputLeftElement) {
          pl = sizes[height];
        }
        if (child.type === InputRightElement) {
          pr = sizes[height];
        }
        if (child.type === Input) {
          return cloneElement(child, {
            size,
            pl: child.props.pl || pl,
            pr: child.props.pr || pr,
          });
        }
        return cloneElement(child, { size });
      })}
    </Box>
  );
};

export default InputGroup;
