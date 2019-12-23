import * as React from "react";

function copyToClipboard<T>(value: T) {
  const el = document.createElement("textarea");
  el.value = value as any;
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

  const onCopy = React.useCallback(() => {
    copyToClipboard(value as any);
    setHasCopied(true);
  }, [value]);

  React.useEffect(() => {
    let timeoutId: any;
    if (hasCopied) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setHasCopied(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [hasCopied]);

  return { value, onCopy, hasCopied };
}

export default useClipboard;
