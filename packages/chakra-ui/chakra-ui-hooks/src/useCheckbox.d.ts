import * as React from "react";
interface Options {
    isChecked?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    defaultIsChecked?: boolean;
    isIndeterminate?: boolean;
    ref?: React.Ref<HTMLElement>;
    onChange?: (k: any) => void;
    value?: string | number;
}
declare function useCheckbox(props: Options): {
    ref: React.RefObject<HTMLElement> | ((node: HTMLElement) => void) | null;
    tabIndex: number | undefined;
    readonly: boolean | undefined;
    role: string;
    type: string;
    value: string | number | undefined;
    onClick: () => void;
    "aria-checked": string | boolean | undefined;
    "aria-invalid": boolean | undefined;
    "aria-readonly": boolean | undefined;
    "aria-disabled": boolean | undefined;
};
export default useCheckbox;
