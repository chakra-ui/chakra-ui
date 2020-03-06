import React from "react"

const noflash = `(function() { try {
  var mode = localStorage.getItem('chakra-ui-color-mode');
  if (!mode) return
  document.body.classList.add('chakra-ui-' + mode);
} catch (e) {} })();`

export const InitializeColorMode = () =>
  React.createElement("script", {
    key: "chakra-ui-no-flash",
    dangerouslySetInnerHTML: {
      __html: noflash,
    },
  })
