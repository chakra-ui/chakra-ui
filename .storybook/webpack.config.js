const path = require("path");
module.exports = ({ config }) => {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    "@chakra-ui/core": path.resolve(
      __dirname,
      "../node_modules/@chakra-ui/core",
    ),
  });
  return config;
};
