module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["tests/**/*.{ts,tsx,js,jsx}"],
  transform: { ".(ts|tsx)$": "ts-jest/dist" },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
}
