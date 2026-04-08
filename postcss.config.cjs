const path = require("path")
module.exports = {
  plugins: [
    require("@pandacss/dev/postcss")({
      configPath: path.resolve(__dirname, "packages/react-next/panda.config.ts"),
      cwd: path.resolve(__dirname, "packages/react-next"),
    }),
  ],
}
