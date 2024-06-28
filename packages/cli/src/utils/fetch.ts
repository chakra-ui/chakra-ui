import { HttpsProxyAgent } from "https-proxy-agent"
import fetch from "node-fetch"
import * as S from "./schema"

const env = S.processEnv.parse(process.env)

const agent = env.HTTPS_PROXY ? new HttpsProxyAgent(env.HTTPS_PROXY) : undefined

export async function fetchCompositions() {
  const res = await fetch(`${env.REGISTRY_URL}/compositions/index.json`, {
    agent,
  })
  const json = await res.json()
  return S.compositionIndex.parse(json)
}

export async function fetchComposition(id: string) {
  const res = await fetch(`${env.REGISTRY_URL}/compositions/${id}.json`, {
    agent,
  })
  const json = await res.json()
  return S.compositionFile.parse(json)
}
