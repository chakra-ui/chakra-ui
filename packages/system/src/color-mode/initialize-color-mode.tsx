import * as React from "react"

export const InitializeColorMode = () => (
  <script
    key="chakra-ui-no-flash"
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        // Change these if you use something different in your hook.
        var storageKey = "chakra-ui-color-mode";
        var classNameDark = "chakra-ui-dark";
        var classNameLight = "chakra-ui-light";
  
        function setClassOnDocumentBody(darkMode) {
          document.body.classList.add(darkMode ? classNameDark : classNameLight);
          document.body.classList.remove(
            darkMode ? classNameLight : classNameDark,
          );
        }
  
        var preferDarkQuery = "(prefers-color-scheme: dark)";
        var mql = window.matchMedia(preferDarkQuery);
        var supportsColorSchemeQuery = mql.media === preferDarkQuery;
        var localStorageTheme = null;
        try {
          localStorageTheme = localStorage.getItem(storageKey);
        } catch (err) {}
        var localStorageExists = localStorageTheme !== null;
        if (localStorageExists) {
          localStorageTheme = JSON.parse(localStorageTheme);
        }
  
        // Determine the source of truth
        if (localStorageExists) {
          // source of truth from localStorage
          setClassOnDocumentBody(localStorageTheme);
        } else if (supportsColorSchemeQuery) {
          // source of truth from system
          setClassOnDocumentBody(mql.matches);
          localStorage.setItem(storageKey, mql.matches ? "dark" : "light");
        } else {
          // source of truth from document.body
          var isDarkMode = document.body.classList.contains(classNameDark);
          localStorage.setItem(storageKey, isDarkMode ? "dark": "light");
        }
      })();
      `,
    }}
  />
)

export default InitializeColorMode
