/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useState,
} from "react";
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Input, InputOptions, InputProps } from "../Input";
import { inputSizes, InputSizes } from "../Input/styles";
import { InputLeftAddon, InputRightAddon } from "../InputAddon";
import { InputLeftElement, InputRightElement } from "../InputElement";
import { useTheme } from "../ThemeProvider";
import { Merge } from "../utils";

export interface InputGroupOptions {
  size?: InputOptions["size"];
  children: React.ReactNode;
}

export type InputGroupProps<P, T> = Merge<BoxProps<P, T>, InputGroupOptions>;

const InputGroup = forwardRef(function InputGroup<P, T extends HTMLElement>(
  { children, size = "md", ...props }: InputGroupProps<P, T>,
  ref: React.Ref<T>,
) {
  const { sizes } = useTheme();
  const height = inputSizes[size] && inputSizes[size]["height"];
  let pl: SystemProps["pl"] | null = null;
  let pr: SystemProps["pr"] | null = null;

  return (
    <Box display="flex" position="relative" ref={ref} {...props}>
      {Children.map(children, child => {
        if (!isValidElement(child)) return;

        if (child.type === InputLeftElement) {
          pl = sizes[height as InputSizes];
        }
        if (child.type === InputRightElement) {
          pr = sizes[height as InputSizes];
        }
        if (child.type === Input) {
          return cloneElement(child as React.ReactElement<InputProps>, {
            size,
            pl: (child.props as { pl: any }).pl || pl,
            pr: (child.props as { pr: any }).pr || pr,
          });
        }
        return cloneElement(child as React.ReactElement<InputProps>, { size });
      })}
    </Box>
  );
}) as <P, T>(
  props: InputGroupProps<P, T>,
) => React.ReactElement<InputGroupProps<P, T>>;

const size = "md";

export function WithLeftAddon() {
  return (
    <InputGroup size={size}>
      <InputLeftAddon>+234</InputLeftAddon>
      <Input roundedLeft="0" placeholder="Welcome" />
    </InputGroup>
  );
}

export function WithRightAddon() {
  return (
    <InputGroup size={size}>
      <InputRightAddon>+234</InputRightAddon>
      <Input roundedLeft="0" placeholder="Welcome" />
    </InputGroup>
  );
}

export function WithLeftIcon() {
  return (
    <InputGroup size={size}>
      <InputLeftElement>
        <Icon name="phone" size="1em" />
      </InputLeftElement>
      <Input placeholder="Welcome" />
    </InputGroup>
  );
}

export function WithRightIcon() {
  return (
    <InputGroup size={size}>
      <InputRightElement>
        <Icon name="check" size="1em" />
      </InputRightElement>
      <Input placeholder="Welcome" />
    </InputGroup>
  );
}

export function PasswordInput() {
  const [show, setShow] = useState(false);
  return (
    <InputGroup size="md">
      <Input
        pr="72px"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="72px" isDisabled>
        <Button size="sm" variant="link" onClick={() => setShow(!show)}>
          {show ? "HIDE" : "SHOW"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default InputGroup;
