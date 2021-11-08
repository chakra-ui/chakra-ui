module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["tests/**/*.{ts,tsx,js,jsx}"],
  transform: {
    ".(ts|tsx)$": "@swc-node/jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
}
