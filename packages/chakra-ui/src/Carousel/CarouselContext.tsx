import { createContext } from 'react';

const CarouselContext = createContext<
  [
    boolean,
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    React.MutableRefObject<HTMLElement[]>,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    boolean,
  ]
>([
  false,
  false,
  [false, () => {}],
  [0, () => {}],
  [1, () => {}],
  { current: [] },
  [false, () => {}],
  false,
]);

export default CarouselContext;
