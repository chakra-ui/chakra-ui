type StrictRef<T> = NonNullable<React.Ref<T>>
type RefCleanup<T> = ReturnType<React.RefCallback<T>>

export function assignRef<T = any>(ref: StrictRef<T>, value: T | null) {
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
}
