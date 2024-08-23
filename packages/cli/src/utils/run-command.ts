import { execSync } from "child_process"
import { detect } from "package-manager-detector"

interface PackageManager {
  run: (script: string, args: string) => string
  add: (args: string[], isDev?: boolean) => string
  install: string
}

const commandMap: Record<string, PackageManager> = {
  npm: {
    run: (script: string, args: string) => `npm run ${script} -- ${args}`,
    add: (args: string[], isDev?: boolean) =>
      `npm install ${isDev ? "-D" : ""}${args.join(" ")}`,
    install: "npm install",
  },
  yarn: {
    run: (script: string, args: string) => `yarn ${script} ${args}`,
    add: (args: string[], isDev?: boolean) =>
      `yarn add ${isDev ? "-D" : ""}${args.join(" ")}`,
    install: "yarn",
  },
  pnpm: {
    run: (script: string, args: string) => `pnpm run ${script} -- ${args}`,
    add: (args: string[], isDev?: boolean) =>
      `pnpm add ${isDev ? "-D" : ""}${args.join(" ")}`,
    install: "pnpm install",
  },
  bun: {
    run: (script: string, args: string) => `bun run ${script} -- ${args}`,
    add: (args: string[], isDev?: boolean) =>
      `bun install ${isDev ? "-D" : ""}${args.join(" ")}`,
    install: "bun install",
  },
}

export async function installCommand(args: string[], cwd?: string) {
  const res = await detect({ cwd })
  const agent = res.agent?.split("@")[0] || "npm"
  try {
    const command = Reflect.get(commandMap, agent)
    const str = command.add(args)
    execSync(str, { cwd, stdio: "inherit", encoding: "utf-8" })
  } catch (error) {
    console.error(error)
  }
}
