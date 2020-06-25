import * as React from "react"

const noFlash = `(function() {
  var storageKey = 'chakra-ui-color-mode';
  var classNameDark = 'chakra-ui-dark';
  var classNameLight = 'chakra-ui-light';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageValue = null;

  try {
    localStorageValue = localStorage.getItem(storageKey);
  } catch (err) {}

  var exist = localStorageValue !== null;
  if (exist) {
    localStorageValue = JSON.parse(localStorageValue);
  }

  // Determine the source of truth
  if (exist) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageValue);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
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
