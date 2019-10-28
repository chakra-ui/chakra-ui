import { useRegister, Register } from "./useRegister";
import useFocusEffect from "./useFocusEffect";
import { createOnKeyDown } from "@chakra-ui/utils";

function useRover({
  value,
  isDisabled,
}: {
  value?: string;
  isDisabled?: boolean;
}) {
  const { ref, id, state, actions } = useRegister({
    isDisabled,
    extraData: { value },
  });
  const isSelected = state.selectedId === id;
  useFocusEffect(isSelected, ref);

  return {
    id,
    ref,
    "aria-disabled": isDisabled,
    "data-value": value,
    onClick: () => {
      actions.move(id, "mouse");
    },
    tabIndex: isSelected ? 0 : -1,
    onKeyDown: createOnKeyDown({
      keyMap: {
        ArrowDown: actions.next,
        ArrowUp: actions.previous,
        Home: actions.first,
        End: actions.last,
      },
    }),
  };
}

const Rover = Register;

export { Rover, useRover };
