import sdk from "@stackblitz/sdk"
import { BASE_URL } from "./constants"

const tsconfigNode = {
  compilerOptions: {
    target: "ES2022",
    lib: ["ES2023"],
    module: "ESNext",
    skipLibCheck: true,

    /* Bundler mode */
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    isolatedModules: true,
    moduleDetection: "force",
    noEmit: true,

    /* Linting */
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
  include: ["vite.config.ts"],
}

const tsconfigApp = {
  compilerOptions: {
    target: "ES2020",
    useDefineForClassFields: true,
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    module: "ESNext",
    skipLibCheck: true,

    /* Bundler mode */
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    isolatedModules: true,
    moduleDetection: "force",
    noEmit: true,
    jsx: "react-jsx",

    /* Linting */
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,

    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
  include: ["src"],
}

const tsconfig = {
  files: [],
  references: [
    { path: "./tsconfig.app.json" },
    { path: "./tsconfig.node.json" },
  ],
}

const packageJson = {
  name: "vite-react-typescript-starter",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    codegen: "npx @chakra-ui/cli snippet add",
    dev: "vite",
    build: "tsc -b && vite build",
    lint: "eslint .",
    preview: "vite preview",
  },
  dependencies: {
    "@chakra-ui/react": "^3",
    "@emotion/react": "^11.13.3",
    "next-themes": "^0.3.0",
    react: "^19",
    "react-dom": "^19",
    "react-icons": "^5.3.0",
  },
  devDependencies: {
    "@chakra-ui/cli": "^3",
    "@eslint/js": "^9.10.0",
    "@types/react": "^18.3.6",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    eslint: "^9.10.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.12",
    globals: "^15.9.0",
    typescript: "^5.5.3",
    "typescript-eslint": "^8.6.0",
    vite: "^5.4.6",
    "vite-tsconfig-paths": "^5.0.1",
  },
}

const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`

const main = `import { Box } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Box padding="10">
        <App />
      </Box>
    </Provider>
  </StrictMode>
);
`

async function readComposition(path: string) {
  const url = `${BASE_URL}/compositions/${path}.json`
  const response = await fetch(url)
  const data = await response.json()
  return data.file.content
}

async function readExample(exampleId: string) {
  const url = `${BASE_URL}/example/${exampleId}`
  const response = await fetch(url)
  const data = await response.json()

  // Remove "use client" directive from content and move to top if it exists
  let content = data.content
  let useClientDirective = ""

  if (content.includes('"use client"') || content.includes("'use client'")) {
    // Extract the use client directive
    const useClientMatch = content.match(/^(['"])use client\1\s*;?\s*/m)
    if (useClientMatch) {
      useClientDirective = '"use client"\n\n'
      content = content.replace(/^(['"])use client\1\s*;?\s*/m, "")
    }
  }

  return {
    code: `${useClientDirective}${data.importPaths.join("\n")}\n\n${content}`,
    dependencies: data.npmDependencies,
  }
}

function getDependencies(deps: string[] = []) {
  return {
    ...packageJson.dependencies,
    ...deps.reduce((acc: Record<string, string>, dep: string) => {
      // @ts-ignore
      acc[dep] = packageJson.dependencies[dep] || "latest"
      return acc
    }, {}),
  }
}

export async function openInStackblitzReact(exampleId: string) {
  const example = await readExample(exampleId)

  const code = example.code.replace(/export const \w+ =/, "export const App =")

  const [providerCode, colorModeCode, toasterCode, tooltipCode] =
    await Promise.all([
      readComposition("provider"),
      readComposition("color-mode"),
      readComposition("toaster"),
      readComposition("tooltip"),
    ])

  const dependencies = getDependencies(example.dependencies)

  const files = {
    "tsconfig.app.json": JSON.stringify(tsconfigApp, null, 2),
    "tsconfig.node.json": JSON.stringify(tsconfigNode, null, 2),
    "tsconfig.json": JSON.stringify(tsconfig, null, 2),
    "package.json": JSON.stringify({ ...packageJson, dependencies }, null, 2),
    "vite.config.ts": viteConfig,
    "index.html": indexHtml,
    "src/App.tsx": code,
    "src/main.tsx": main,
    "src/vite-env.d.ts": `/// <reference types="vite/client" />`,
    "src/components/ui/provider.tsx": providerCode,
    "src/components/ui/color-mode.tsx": colorModeCode,
    "src/components/ui/toaster.tsx": toasterCode,
    "src/components/ui/tooltip.tsx": tooltipCode,
  }

  sdk.openProject(
    {
      title: `Chakra UI / v3 / ${exampleId}`,
      description: `Chakra UI v3 component demo from chakra-ui.com`,
      template: "node",
      files,
    },
    {
      openFile: "src/App.tsx",
      showSidebar: false,
    },
  )
}
