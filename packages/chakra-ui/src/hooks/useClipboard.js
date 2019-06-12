import { useState } from "react";

const copyToClipboard = content => {
  const el = document.createElement("textarea");
  el.value = content;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();

  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

const useClipboard = value => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    copyToClipboard(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);
  };

  return { value, onCopy, hasCopied };
};

export default useClipboard;
