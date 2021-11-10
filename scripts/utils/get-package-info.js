/**
 * Gets the information about a package including
 * `yarn workspace` command, directory
 *
 * @param {String} pkg  the package directory to run command
 */
export default function getPackageInfo(pkg) {
  // prepare the workspace command
  const cmd = `yarn workspace @chakra-ui/${pkg}`

  // prepare the directory path to run
  const dir = `packages/${pkg}`

  return { dir, cmd }
}
