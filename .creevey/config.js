const path = require("path")

module.exports = {
  reportDir: path.join(__dirname, "report"),
  screenDir: path.join(__dirname, "images"),
  browsers: {
    chrome: {
      browserName: "chrome",
      viewport: { width: 1024, height: 768 },
    },
    firefox: {
      browserName: "firefox",
      viewport: { width: 1024, height: 768 },
    },
  },
}
