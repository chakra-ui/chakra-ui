module.exports = {
  ImageRadio: `import { useField } from "formik";
import {
  Box,
  Image,
  UseRadioProps,
  useRadio,
  ImageProps,
  chakra,
  useRadioGroupContext,
} from "@chakra-ui/react";
import * as React from "react";

type Props = UseRadioProps &
  ImageProps & {
    image: string,
  };

const ImageRadio = React.forwardRef((props: Props, ref) => {
  const { image, name, ...radioProps } = props;
  const group = useRadioGroupContext();

  let isChecked = group.value.toString() === props.value.toString();

  const [{ checked, ...field }] = useField({
    name,
    type: "radio",
    value: radioProps.value.toString(),
    checked: isChecked,
  });

  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio({
      isChecked: isChecked,
      ...field,
    });

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({}, ref)} hidden />
      <Box
        {...getRadioProps()}
        bg={state.isChecked ? "green.200" : "transparent"}
        w={12}
        p={1}
        rounded="full"
      >
        <Image src={image} rounded="full" {...getLabelProps()} />
      </Box>
    </chakra.label>
  );
});

export default ImageRadio;`,

  RadioGroup: `import { useField } from "formik";
import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
} from "@chakra-ui/react";
import * as React from "react";

type Props = ChakraRadioGroupProps;

const RadioGroup = ({ name, children, ...props }: Props) => {
  const [field, , { setValue }] = useField({ name, value: props.value });

  const namedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return;

    return React.cloneElement(child, {
      name,
    });
  });

  return (
    <ChakraRadioGroup
      {...props}
      {...field}
      onChange={setValue}
      children={namedChildren}
    />
  );
};

export default RadioGroup;`,

  Input: `import { FieldHookConfig, useField } from "formik";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

type Props = ChakraInputProps & FieldHookConfig<"input">;

const Input = ({ name, ...props }: Props) => {
  const [field] = useField(name);
  return <ChakraInput {...props} {...field} />;
};

export default Input;`,

  App: `import { Box, Button } from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";

import Input from "./input";
import RadioGroup from "./radio-group";
import ImageRadio from "./image-radio";

const AVATARS = [
  { name: "Kat", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Kevin", image: "https://randomuser.me/api/portraits/men/86.jpg" },
  { name: "Andy", image: "https://randomuser.me/api/portraits/men/29.jpg" },
  { name: "Jess", image: "https://randomuser.me/api/portraits/women/95.jpg" }
];

type Values = {
  email: string;
  avatar: string;
};

export default function App() {
  return (
    <Box p={24}>
      <Formik
        initialValues={{ email: "", avatar: AVATARS[0].name }}
        onSubmit={console.log}
      >
        {(props: FormikProps<Values>) => (
          <form onSubmit={props.handleSubmit}>
            <Input name="email" />
            <RadioGroup name="avatar" py={2} display="flex" gridColumnGap={2}>
              {AVATARS.map(({ name, image }) => {
                console.log("App line 32 ~ name: ", name)
                return (
                <ImageRadio key={image} image={image} value={name} />
              )})}
            </RadioGroup>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);`,
}
