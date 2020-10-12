const { createConfig } = require("eslint-config-galex/src/createConfig")
const {
  createReactOverride,
} = require("eslint-config-galex/src/overrides/react")
const {
  createTSOverride,
} = require("eslint-config-galex/src/overrides/typescript")

const packageJson = require("../package.json")
const tsConfig = require("./tsconfig.json")

const react = {
  hasReact: !!packageJson.devDependencies.react,
  isCreateReactApp: false,
  isNext: true,
  version: packageJson.devDependencies.react,
}

const typescript = {
  config: tsConfig,
  hasTypeScript: !!packageJson.devDependencies.typescript,
  version: packageJson.devDependencies.react,
}

const TSOverride = createTSOverride({
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./website",
  },
  react,
  typescript,
})

const reactOverride = createReactOverride({
  react,
  rules: {
    "@next/next/no-html-link-for-pages": ["warn", "./website/pages"],
    "react/function-component-definition": "off",
  },
  typescript,
})

module.exports = createConfig({
  overrides: [reactOverride, TSOverride],
  root: true,
  rules: {
    "import/no-namespace": "off",
  },
})
