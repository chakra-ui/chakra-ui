export function loadScript(
  src: string,
  container: HTMLElement,
): HTMLScriptElement {
  const script = Object.assign(document.createElement("script"), {
    async: true,
    src,
  })

  container.append(script)
  return script
}
