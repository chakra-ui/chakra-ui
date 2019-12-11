/** @jsx jsx */
import { jsx } from "@emotion/core";
import Box from "../Box";
import Icon from ".";

const EnhancedIcon = ({ icon, ...props }) => {
  if (typeof icon === "string") {
    return (
      <Icon focusable="false" name={icon} color="currentColor" {...props} />
    );
  }
  return (
    <Box
      as={icon}
      data-custom-icon
      focusable="false"
      color="currentColor"
      {...props}
    />
  );
};

export default EnhancedIcon;
