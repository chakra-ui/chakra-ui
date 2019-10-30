import { useState, useRef } from "react";
import { useEffect } from "react";

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
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutId = useRef<any>();

  const onCopy = () => {
    copyToClipboard(value as any);
    setHasCopied(true);
    timeoutId.current = setTimeout(() => setHasCopied(false), 1500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
    };
  });

  return { value, onCopy, hasCopied };
}

export default useClipboard;
