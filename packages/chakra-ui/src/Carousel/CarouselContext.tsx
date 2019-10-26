import React from "react";

const CarouselContext = React.createContext<
  [
    boolean,
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    boolean,
  ]
>([
  /* isHovered: */ false,
  /* isFocused: */ false,
  /* [disableAutoPause, setDisableAutoPause]: */ [false, () => {}],
  /* [uncontrolledShownIndex, setUncontrolledShownIndex]: */ [0, () => {}],
  /* [totalCount, setTotalCount]: */ [1, () => {}],
  /* [isPlaying, setPlaying]: */ [false, () => {}],
  /* isInfinite: */ false,
]);

export default CarouselContext;
