//@ts-expect-error
import welcome from "cli-welcome"

export async function initCLI() {
  const pkgJSON = require("../../package.json")

  const { default: updateNotifier } = await import("update-notifier")

  welcome({
    title: "Chakra UI CLI",
    tagLine: `by Chakra UI\n${pkgJSON.description}`,
    bgColor: `#319795`,
    color: `#FFFFFF`,
    bold: true,
    clear: false,
    version: pkgJSON.version,
  })

  updateNotifier({
    pkg: pkgJSON,
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3, // 3 days
  }).notify({ isGlobal: true })
}
