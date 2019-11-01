import {
  useSelection,
  useSelectionState,
  UseSelectionOptions,
} from "./useSelection/useSelection";
import useFocusEffect from "./useFocusEffect";
import { createOnKeyDown } from "@chakra-ui/utils";

interface UseRoverOptions extends UseSelectionOptions {
  value?: string;
  orientation?: "horizontal" | "vertical";
}

function useRover(options: UseRoverOptions) {
  const {
    value,
    isDisabled,
    isFocusable,
    actions,
    state,
    orientation = "vertical",
    extraData,
  } = options;
  const { ref, id } = useSelection({
    extraData: { value, ...extraData },
    isDisabled,
    isFocusable,
    state,
    actions,
    id: options.id,
  });
  // const isSelected = state.selectedId === id;
  // useFocusEffect(isSelected, ref);

  // const isVertical = orientation === "vertical";
  // const isHorizontal = orientation === "horizontal";

  // return {
  //   id,
  //   ref,
  //   "aria-disabled": isDisabled,
  //   "data-value": value,
  //   onClick: () => {
  //     //@ts-ignore
  //     actions.move(id, "mouse");
  //   },
  //   tabIndex: isSelected ? 0 : -1,
  //   onKeyDown: createOnKeyDown({
  //     keyMap: {
  //       ArrowDown: isVertical ? actions.next : undefined,
  //       ArrowUp: isVertical ? actions.previous : undefined,
  //       ArrowLeft: isHorizontal ? actions.next : undefined,
  //       ArrowRight: isHorizontal ? actions.previous : undefined,
  //       Home: actions.first,
  //       End: actions.last,
  //     },
  //   }),
  // };
}

const useRoverState = useSelectionState;

// export { useRoverState, useRover };
