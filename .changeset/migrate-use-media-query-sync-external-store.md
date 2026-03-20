---
"@chakra-ui/react": minor
---

Migrate `useMediaQuery` hook from `useState + useEffect` to
`useSyncExternalStore`

- Eliminates hydration flicker (SSR fallback → real value transition is now
  synchronous)
- Prevents tearing in React concurrent mode
- The `ssr` option is now a no-op (kept for backward compatibility)
- Dropped legacy `addListener`/`removeListener` fallback (Safari <14)
