import css from "@styled-system/css";
import { PseudoProps } from "./pseudo.interface";
import { tx } from "./pseudo.utils";
import sx from "./pseudo.selectors";

const pseudo = ({ theme, ...props }: { theme: object } & PseudoProps) =>
  css({
    [sx.hover]: tx(props._hover),
    [sx.focus]: tx(props._focus),
    [sx.active]: tx(props._active),
    [sx.visited]: tx(props._visited),
    [sx.disabled]: tx(props._disabled),
    [sx.selected]: tx(props._selected),
    [sx.invalid]: tx(props._invalid),
    [sx.expanded]: tx(props._expanded),
    [sx.grabbed]: tx(props._grabbed),
    [sx.readOnly]: tx(props._readOnly),
    [sx.first]: tx(props._first),
    [sx.notFirst]: tx(props._notFirst),
    [sx.notLast]: tx(props._notLast),
    [sx.last]: tx(props._last),
    [sx.odd]: tx(props._odd),
    [sx.even]: tx(props._even),
    [sx.indeterminate]: tx(props._indeterminate),
    [sx.checked]: tx(props._checked),
    [sx.pressed]: tx(props._pressed),
    [sx.groupHover]: tx(props._groupHover),
    [sx.loading]: tx(props._loading),
    [sx.activeLink]: tx(props._activeLink),
    [sx.before]: tx(props._before),
    [sx.after]: tx(props._after),
    [sx.focusWithin]: tx(props._focusWithin),
    [sx.placeholder]: props._placeholder,
    [sx.hidden]: props._hidden,
  })(theme);

export default pseudo;
