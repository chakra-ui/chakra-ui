module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["jest-emotion"],
  moduleNameMapper: {
    "@chakra-ui/utils": "<rootDir>/packages/utils",
    "@chakra-ui/hooks": "<rootDir>/packages/hooks",
    "@chakra-ui/system": "<rootDir>/packages/styled",
  },
  transformIgnorePatterns: ["^.+\\.js$"],
}
