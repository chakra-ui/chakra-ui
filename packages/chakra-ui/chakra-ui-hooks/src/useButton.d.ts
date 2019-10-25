import { MouseEventHandler } from "react";
import { KeyboardEventHandler } from "react";
interface Props<T> {
    isDisabled?: boolean;
    onMouseOver?: MouseEventHandler<T | HTMLElement>;
    isFocusable?: boolean;
    onClick?: MouseEventHandler<T | HTMLElement>;
    onKeyUp?: KeyboardEventHandler<T | HTMLElement>;
    onKeyDown?: KeyboardEventHandler<T | HTMLElement>;
}
declare function useButton<T>(props: Props<T>): {
    ref: import("react").RefObject<HTMLElement>;
    role: string;
    "aria-disabled": boolean | undefined;
    tabIndex: number | undefined;
    onClick: (event: any) => void;
    onKeyUp: (event: any) => void;
    onMouseOver: (event: any) => void;
    onKeyDown: (event: any) => void;
};
export default useButton;
