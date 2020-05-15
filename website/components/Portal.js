import { Component } from "react"
import ReactDOM from "react-dom"

let portalContainer

const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

export default class Portal extends Component {
  constructor() {
    super()

    // This fixes SSR
    if (!canUseDom) return

    if (!portalContainer) {
      portalContainer = document.createElement("div")
      portalContainer.setAttribute("evergreen-portal-container", "")
      document.body.append(portalContainer)
    }

    this.el = document.createElement("div")
    portalContainer.append(this.el)
  }

  componentWillUnmount() {
    portalContainer.removeChild(this.el)
  }

  render() {
    // This fixes SSR
    if (!canUseDom) return null
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
