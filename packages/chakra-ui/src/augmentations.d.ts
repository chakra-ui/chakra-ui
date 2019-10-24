// TODO: Remove when React supports `inert` attribute

declare module 'react' {
  interface DOMAttributes<T> {
    inert?: '' | undefined;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      inert?: '' | undefined;
    }
  }
}

export {};
