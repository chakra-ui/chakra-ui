import * as React from "react";
import { useFormControlContext } from "./FormControl";
import { useModeValue, chakra, PropsOf } from "@chakra-ui/system";
import { Icon } from "@chakra-ui/icon";

function WarningIcon(props: PropsOf<typeof Icon>) {
  return (
    <Icon {...props}>
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </Icon>
  );
}

export type FormErrorMessageProps = { icon?: React.ReactType } & PropsOf<
  typeof chakra.div
>;

const FormErrorMessage = React.forwardRef(
  (
    { children, icon, ...props }: FormErrorMessageProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const context = useFormControlContext();
    const color = useModeValue(`red.500`, `red.300`);

    if (!context.isInvalid) return null;

    const IconComponent = icon || WarningIcon;

    return (
      <chakra.div
        ref={ref}
        color={color}
        id={context.id ? `${context.id}-error-message` : undefined}
        mt={2}
        fontSize="sm"
        display="flex"
        alignItems="center"
        {...props}
      >
        <IconComponent aria-hidden />
        <chakra.p marginLeft="0.5em" lineHeight="normal">
          {children}
        </chakra.p>
      </chakra.div>
    );
  },
);

FormErrorMessage.displayName = "FormErrorMessage";

export default FormErrorMessage;
