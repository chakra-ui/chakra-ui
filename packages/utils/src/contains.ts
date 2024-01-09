export function contains(parent: HTMLElement | null, child: HTMLElement) {
  if (!parent) return false
  return parent === child || parent.contains(child)
}
