const path = require("path");

module.exports = async ({ config }) => {
  config.stats = "errors-only";
  config.resolve = {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    symlinks: true,
  };
  return config;
};
