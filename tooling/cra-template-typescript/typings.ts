declare module "*.svg" {
  const content: any
  export default content
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace NodeJS {
  export interface ProcessEnv {
    [key: string]: string
  }
}
