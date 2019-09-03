interface IClipboard<T> {
  value?: T;
  onCopy?: () => void;
  hasCopied?: boolean;
}

/**
 * `useClipboard` is a custom hook to handle copying content to clipboard
 */
declare function useClipboard<T>(value: T): IClipboard<T>;

export default useClipboard;
