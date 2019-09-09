/** @jsx jsx */
import { jsx } from "@emotion/core";
import Flex from "../Flex";
import PseudoBox from "../PseudoBox";
import Icon from "../Icon";
import { useColorMode } from "../ColorModeProvider";
import styleProps from "./styles";

const SpinButton = ({ isDisabled, onClick, onMouseDown, ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <PseudoBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1"
      cursor="pointer"
      transition="all 0.3s"
      role="button"
      tabindex="-1"
      userSelect="none"
      aria-disabled={isDisabled}
      onClick={isDisabled ? null : onClick}
      onMouseDown={isDisabled ? null : onMouseDown}
      {...styleProps({ colorMode })}
      {...props}
    />
  );
};

const Spinner = ({ incrementProps, decrementProps, iconSize, ...rest }) => {
  return (
    <Flex
      flexDir="column"
      aria-hidden
      w="24px"
      m="1px"
      pos="absolute"
      right="0px"
      h="calc(100% - 2px)"
      {...rest}
    >
      <SpinButton {...incrementProps}>
        <Icon name="chevron-up" size={iconSize} />
      </SpinButton>
      <SpinButton {...decrementProps}>
        <Icon name="chevron-down" size={iconSize} />
      </SpinButton>
    </Flex>
  );
};

export default Spinner;
