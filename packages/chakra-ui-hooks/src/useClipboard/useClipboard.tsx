import * as React from "react";

function copyToClipboard<T extends string>(value: T) {
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  let selected: any;
  if (
    document &&
    document.getSelection() &&
    (document.getSelection() as Selection).rangeCount > 0
  ) {
    selected = (document.getSelection() as Selection).getRangeAt(0);
  } else {
    selected = false;
  }

  el.select();

  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    (document.getSelection() as Selection).removeAllRanges();
    (document.getSelection() as Selection).addRange(selected);
  }
}

function useClipboard<T>(value: T) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const timeoutRef = React.useRef<any>();

  const onCopy = React.useCallback(() => {
    copyToClipboard(value as any);
    setHasCopied(true);
    timeoutRef.current = setTimeout(() => setHasCopied(false), 1500);
  }, [value]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });

  return { value, onCopy, hasCopied };
}

export default useClipboard;
