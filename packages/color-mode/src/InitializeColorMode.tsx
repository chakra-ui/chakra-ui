import * as React from "react"

const noFlash = `(function() { try {
  var mode = localStorage.getItem('chakra-ui-color-mode');
  if (!mode) return
  document.body.classList.add('chakra-ui-' + mode);
} catch (e) {} })();`

export const InitializeColorMode = () => (
  <script
    key="chakra-ui-no-flash"
    dangerouslySetInnerHTML={{ __html: noFlash }}
  />
)
