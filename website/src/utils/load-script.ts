function loadScript(src: string, container: HTMLElement) {
  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.src = src
  container.appendChild(script)
  return script
}

export default loadScript
