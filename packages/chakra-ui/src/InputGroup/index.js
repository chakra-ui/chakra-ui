/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, isValidElement } from "react";
import Box from "../Box";
import Input from "../Input";
import { inputSizes } from "../Input/styles";
import { InputLeftElement, InputRightElement } from "../InputElement";
import { useTheme } from "../ThemeProvider";

const InputGroup = ({ children, size = "md", ...props }) => {
  const { sizes } = useTheme();
  const height = inputSizes[size] && inputSizes[size]["height"];
  let pl = null;
  let pr = null;
  return (
    <Box display="flex" position="relative" {...props}>
      {Children.map(children, child => {
        if (!isValidElement(child)) return;

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
