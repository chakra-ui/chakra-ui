declare module "dom-focus-lock" {
  interface FocusLock {
    on: (domNode: HTMLElement) => void;
    off: (domNode: HTMLElement) => void;
  }
  const focusLock: FocusLock;
  export default focusLock;
}
