import { type Agent, detect, getUserAgent } from "package-manager-detector"

export async function getAgent(): Promise<Agent> {
  return (await detect())?.agent ?? getUserAgent() ?? "npm"
}
