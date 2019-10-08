module.exports = async ({ config }) => {
  config.stats = "errors-only";
  return config;
};
