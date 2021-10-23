module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  modulePathIgnorePatterns: [
    "<rootDir>/website/.cache",
    "<rootDir>/examples",
    "<rootDir>/tooling/cra-template*",
  ],
  transform: {
    "^.+\\.(ts|tsx)?$": "@swc-node/jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
}
