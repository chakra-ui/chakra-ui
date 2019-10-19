module.exports = {
  rootDir: __dirname,
  collectCoverageFrom: [
    "packages/chakra-ui/src/**/*.{js,ts,tsx}",
    "!**/*-test.{js,ts,tsx}",
  ],
  projects: ["<rootDir>/packages/*/jest.config.js"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/jest.setup.js",
  ],
};
