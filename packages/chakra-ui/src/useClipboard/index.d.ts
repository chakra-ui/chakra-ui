interface IClipboard<T> {
  value: T;
  onCopy: () => void;
  hasCopied: boolean;
}

/**
 * `useClipboard` is a custom hook to handle copying content to clipboard
 */
export default function useClipboard<T>(value: T): IClipboard<T>;
