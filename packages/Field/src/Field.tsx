import * as React from "react";
import {
  BaseLabel,
  BaseRequiredIndicator,
  BaseErrorText,
  BaseHelpText,
  useFieldContext,
  BaseInput,
  BaseTextarea,
  BaseField,
} from "./Field.base";

import { createChakra, useColorModeValue, PropsOf } from "@chakra-ui/system";
import { Icon } from "@chakra-ui/icon";

export const Field = createChakra(BaseField);

export const Label = createChakra(BaseLabel, {
  themeKey: "Label",
  baseStyle: {
    fontSize: "md",
    paddingRight: "12px",
    paddingBottom: "4px",
    opacity: 1,
    _disabled: {
      opacity: 0.4,
    },
    textAlign: "left",
    verticalAlign: "middle",
    display: "inline-block",
  },
});

export const RequiredIndicator = createChakra(BaseRequiredIndicator, {
  themeKey: "RequiredIndicator",
  baseStyle: (props: any) => ({
    marginLeft: 1,
    color: props.colorMode === "dark" ? "red.300" : "red.500",
  }),
  attrs: {
    role: "presentation",
  },
});

export const ErrorText = createChakra(BaseErrorText, {
  themeKey: "ErrorText",
  baseStyle: (props: any) => ({
    color: props.colorMode === "dark" ? "red.300" : "red.500",
    marginTop: 2,
    fontSize: "sm",
    display: "flex",
    alignItems: "center",
  }),
});

export const ErrorIcon = (props: PropsOf<typeof Icon>) => {
  const color = useColorModeValue(`red.500`, `red.300`);
  const field = useFieldContext();

  if (!field.isInvalid) return null;

  return (
    <Icon color={color} {...props}>
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </Icon>
  );
};

export const Input = createChakra<
  typeof BaseInput,
  { focusBorderColor?: string; errorBorderColor?: string }
>(BaseInput, {
  themeKey: "Input",
});

export const Textarea = createChakra(BaseTextarea, {
  themeKey: "Textarea",
});

export const HelpText = createChakra(BaseHelpText, {
  themeKey: "HelpText",
  baseStyle: (props: any) => ({
    marginTop: 2,
    color: props.colorMode === "dark" ? "whiteAlpha.600" : "gray.500",
    lineHeight: "normal",
    fontSize: "sm",
  }),
});
