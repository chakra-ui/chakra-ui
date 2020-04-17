module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
  transform: { ".(ts|tsx)$": "ts-jest/dist" },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["jest-emotion"],
}
