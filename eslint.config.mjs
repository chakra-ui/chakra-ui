import { fixupConfigRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import * as tsParser from "@typescript-eslint/parser"
import testingLibrary from "eslint-plugin-testing-library"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores([
    "**/dist",
    "**/node_modules",
    "**/coverage",
    "**/.next",
    "**/build",
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        // "airbnb-typescript",
        "prettier",
      ),
    ),

    plugins: {
      "@typescript-eslint": typescriptEslint,
      "testing-library": testingLibrary,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 10,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.build.json",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.build.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      // TypeScript specific rules
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-shadow": "off",

      // Code quality rules - ENABLED for better code quality
      "eqeqeq": ["error", "always", { "null": "ignore" }], // Enforce === and !==
      "no-console": ["warn", { "allow": ["warn", "error"] }], // Warn on console.log
      "prefer-const": "error", // Prefer const over let when not reassigned
      "no-var": "error", // Disallow var, use let/const
      "prefer-template": "warn", // Prefer template literals over string concatenation

      // React specific rules
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".js", ".tsx"],
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "react/no-array-index-key": "off",
      "react/require-default-props": "off",
      "react/sort-prop-types": "error",
      "react/prop-types": "off",
      "react/forbid-prop-types": "off",
      "react/button-has-type": "off",
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-children-prop": "off",
      "react/state-in-constructor": "off",
      "react/destructuring-assignment": "off",
      "react/sort-comp": "off",
      "react/no-danger": "off",

      // React Hooks
      "react-hooks/exhaustive-deps": "error",

      // Import rules
      "import/prefer-default-export": "off",
      "import/export": "off",
      "import/namespace": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",

      // General code style rules - keeping off for compatibility
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "no-shadow": "off",
      "no-plusplus": "off",
      "spaced-comment": "off",
      "guard-for-in": "off",
      "operator-assignment": "off",
      "prefer-destructuring": "off",
      "consistent-return": "off",
      "no-restricted-syntax": "off",
      "no-continue": "off",
      "no-bitwise": "off",
      "no-redeclare": "off",
      "no-alert": "off",
      "prefer-object-spread": "off",
      "arrow-body-style": "off",

      // Accessibility
      "jsx-a11y/no-autofocus": "off",
    },
  },
])
