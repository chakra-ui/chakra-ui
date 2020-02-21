module.exports = {
  setupFilesAfterEnv: ["./test/setupTests.ts"],
  snapshotSerializers: ["jest-emotion"],
  preset: "ts-jest/presets/js-with-babel",
};
