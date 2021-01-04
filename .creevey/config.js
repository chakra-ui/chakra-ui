const path = require("path")

module.exports = {
  reportDir: path.join(__dirname, "report"),
  screenDir: path.join(__dirname, "images"),
  browsers: {
    chrome: {
      browserName: "chrome",
    },
    firefox: {
      browserName: "firefox",
    },
  },
}
