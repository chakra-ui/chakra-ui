/** @jsx jsx */
import { jsx } from "@emotion/core";
import Button from "../Button/";
import Box from "../Box";
import Flex from "../Flex";

const ActionButtons = ({
  submitText,
  submitColor,
  onSubmit,
  cancelText,
  size,
  onCancel,
  isLoading,
  type = "button",
  spacing = "12px",
  ...rest
}) => {
  return (
    <Flex alignItems="center" {...rest}>
      <Button size={size} variant="outline" onClick={onCancel} type="button">
        {cancelText}
      </Button>
      <Box size={spacing} />
      <Button
        size={size}
        isLoading={isLoading}
        onClick={onSubmit}
        type={type}
        color={submitColor}
      >
        {submitText}
      </Button>
    </Flex>
  );
};

ActionButtons.defaultProps = {
  submitText: "Save",
  cancelText: "Cancel",
  submitColor: "blue"
};

export default ActionButtons;
