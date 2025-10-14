import { z } from "zod"
import type { Tool } from "../lib/types.js"

type InstallationStep = {
  title: string
  description?: string
  command?: string
  code?: string
  file?: string
}

type FrameworkSteps = {
  framework: string
  nodeVersion: string
  steps: InstallationStep[]
}

const baseSteps: InstallationStep[] = [
  {
    title: "Install packages",
    command: "npm i @chakra-ui/react @emotion/react",
  },
  {
    title: "Add snippets (optional)",
    command: "npx @chakra-ui/cli snippet add",
  },
]

const tsConfigStep: InstallationStep = {
  title: "Update TypeScript configuration",
  file: "tsconfig.json",
  code: `{
"compilerOptions": {
  "target": "ESNext",
  "module": "ESNext",
  "moduleResolution": "Bundler",
  "skipLibCheck": true,
  "paths": {
    "@/*": ["./src/*"]
  }
}
}`,
}

const frameworkMap: Record<string, FrameworkSteps> = {
  "next-app": {
    framework: "Next.js App Router",
    nodeVersion: "Node.js 20.x+",
    steps: [
      ...baseSteps,
      tsConfigStep,
      {
        title: "Setup Provider in root layout",
        file: "app/layout.tsx",
        code: `import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
return (
<html suppressHydrationWarning>
<body>
  <Provider>{children}</Provider>
</body>
</html>
)
}`,
      },
      {
        title: "Optimize bundle (optional)",
        file: "next.config.mjs",
        code: `export default {
experimental: {
optimizePackageImports: ["@chakra-ui/react"],
},
}`,
      },
    ],
  },
  "next-pages": {
    framework: "Next.js Pages Router",
    nodeVersion: "Node.js 20.x+",
    steps: [
      ...baseSteps,
      tsConfigStep,
      {
        title: "Setup Provider",
        file: "pages/_app.tsx",
        code: `import { Provider } from "@/components/ui/provider"

export default function App({ Component, pageProps }: AppProps) {
return (
<Provider>
  <Component {...pageProps} />
</Provider>
)
}`,
      },
      {
        title: "Update document",
        file: "pages/_document.tsx",
        code: `import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
return (
<Html suppressHydrationWarning>
  <Head />
  <body>
    <Main />
    <NextScript />
  </body>
</Html>
)
}`,
      },
      {
        title: "Optimize bundle (optional)",
        file: "next.config.mjs",
        code: `export default {
experimental: {
optimizePackageImports: ["@chakra-ui/react"],
},
}`,
      },
    ],
  },

  vite: {
    framework: "Vite",
    nodeVersion: "Node.js 20.x+",
    steps: [
      ...baseSteps,
      {
        title: "Update TypeScript configuration",
        file: "tsconfig.app.json",
        code: `{
"compilerOptions": {
"target": "ESNext",
"module": "ESNext",
"moduleResolution": "Bundler",
"skipLibCheck": true,
"paths": {
  "@/*": ["./src/*"]
}
}
}`,
      },
      {
        title: "Setup Provider",
        file: "src/main.tsx",
        code: `import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
<Provider>
  <App />
</Provider>
</React.StrictMode>,
)`,
      },
      {
        title: "Install vite-tsconfig-paths",
        command: "npm i -D vite-tsconfig-paths",
      },
      {
        title: "Configure Vite paths",
        file: "vite.config.ts",
        code: `import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
plugins: [react(), tsconfigPaths()],
})`,
      },
    ],
  },

  general: {
    framework: "General",
    nodeVersion: "Node.js 20.x+",
    steps: [
      ...baseSteps,
      tsConfigStep,
      {
        title: "Setup Provider",
        description: "Wrap your application root with the Provider component",
        code: `import { Provider } from "@/components/ui/provider"

function App({ Component, pageProps }) {
return (
<Provider>
  <Component {...pageProps} />
</Provider>
)
}`,
      },
    ],
  },
}

export const installationTool: Tool<{}> = {
  name: "installation",
  description:
    "Get lightweight installation steps for Chakra UI when using Vite, Next.js App Router, Next.js Pages Router, or general setup.",
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        framework: z
          .enum(Object.keys(frameworkMap) as [string, ...string[]])
          .describe(
            "The framework you're using: vite, next-app, next-pages, or general",
          ),
      },
      async ({ framework }) => {
        const json = frameworkMap[framework] || frameworkMap.general
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(json, null, 2),
            },
          ],
        }
      },
    )
  },
}
