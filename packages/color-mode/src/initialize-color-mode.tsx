import * as React from "react"

const noFlash = `(function() { try {
  var mode = localStorage.getItem('chakra-ui-color-mode');
  if (!mode) return
  document.body.classList.add('chakra-ui-' + mode);
} catch (e) {} })();`

/**
 * Script to add to the root of your application to help prevent
 * flash of color mode that can happen during page load.
 *
 * This is particular useful for SSR in Gatsby or Next.js
 */
export const InitializeColorMode = () => (
  <script dangerouslySetInnerHTML={{ __html: noFlash }} />
)
