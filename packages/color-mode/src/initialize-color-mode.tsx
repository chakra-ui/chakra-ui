import * as React from "react"

const noFlash = `(function() {
  const key = 'chakra-ui-color-mode';
  const classNameDark = 'chakra-ui-dark';
  const classNameLight = 'chakra-ui-light';

  function setClassOnDocumentBody(isDark) {
    document.body.classList.add(isDark ? classNameDark : classNameLight);
    document.body.classList.remove(isDark ? classNameLight : classNameDark);
  }

  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const mql = window.matchMedia(preferDarkQuery);
  const supportsColorSchemeQuery = mql.media === preferDarkQuery;
  let stored = null;

  try {
    stored = localStorage.getItem(key);
  } catch (err) {}

  let exist = stored !== null;
  if (exist) {
    stored = JSON.parse(stored);
  }

  if (exist) {
    const isDark = stored === "dark"
    setClassOnDocumentBody(isDark);
  } else if (supportsColorSchemeQuery) {
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(key, mql.matches ? "dark" : "light");
  } else {
    let isDark = document.body.classList.contains(classNameDark);
    localStorage.setItem(key, JSON.stringify(isDark ? "dark": "light"));
  }
})();`

/**
 * Script to add to the root of your application to help prevent
 * flash of color mode that can happen during page load.
 *
 * This is particular useful for SSR in Gatsby or Next.js
 */
export const InitializeColorMode = () => (
  <script dangerouslySetInnerHTML={{ __html: noFlash }} />
)
