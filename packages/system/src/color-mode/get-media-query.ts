export function getMediaQuery() {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const queryList: MediaQueryList = window.matchMedia?.(preferDarkQuery);
  const isQuerySupported = queryList.media === preferDarkQuery;
  const isDark = isQuerySupported && queryList.matches;

  return { isQuerySupported, isDark, queryList };
}

export default getMediaQuery;
