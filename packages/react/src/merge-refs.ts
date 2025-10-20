import * as React from "react"

type StrictRef<T> = NonNullable<React.Ref<T>>
type RefCleanup<T> = ReturnType<React.RefCallback<T>>

// Detect React version at module level for efficiency
const majorVersion = parseInt(React.version.split(".")[0], 10)
const shouldReturnCleanup = majorVersion >= 19

export function assignRef<T = any>(
  ref: StrictRef<T>,
  value: T | null,
): RefCleanup<T> {
  if (ref == null) return

  if (typeof ref === "function") {
    return ref(value)
  }

  try {
    ref.current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  const availableRefs = refs.filter((ref) => ref != null)

  if (shouldReturnCleanup) {
    // React 19+ - return cleanup function
    const cleanupMap = new Map<StrictRef<T>, Exclude<RefCleanup<T>, void>>()

    return (node: T | null) => {
      availableRefs.forEach((ref) => {
        const cleanup = assignRef(ref, node)
        if (cleanup) {
          cleanupMap.set(ref, cleanup)
        }
      })

      return () => {
        availableRefs.forEach((ref) => {
          const cleanup = cleanupMap.get(ref)
          if (cleanup && typeof cleanup === "function") {
            cleanup()
          } else {
            assignRef(ref, null)
          }
        })

        cleanupMap.clear()
      }
    }
  } else {
    // React 18 and below - don't return cleanup function to avoid warnings
    return (node: T | null) => {
      availableRefs.forEach((ref) => {
        assignRef(ref, node)
      })
      // Don't return a cleanup function to avoid React 18 warnings
      // The cleanup will be handled by React's internal ref management
    }
  }
}
