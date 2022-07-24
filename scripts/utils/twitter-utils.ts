import { config } from "dotenv"
import { TwitterClient } from "twitter-api-client"
import { reactPkg, getChangesetEntries } from "./changeset-utils"

config()

/* -----------------------------------------------------------------------------
 * The twitter client
 * -----------------------------------------------------------------------------*/
export function getTwitterClient() {
  return new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY!,
    apiSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
}

const uniq = <T>(arr: T[]) => [...new Set(arr)]

/* -----------------------------------------------------------------------------
 * The release artifacts for twitter
 * -----------------------------------------------------------------------------*/

export async function generateTweetArtifact() {
  const { summary: changesets, releases } = await getChangesetEntries({
    cwd: process.cwd(),
  })

  const pkg = releases.find((changeset) => changeset.name === reactPkg)
  const version = pkg!.newVersion

  return {
    version,
    get releaseUrl() {
      return `https://github.com/chakra-ui/chakra-ui/releases/tag/@chakra-ui/react@${version}`
    },
    patches: uniq(
      changesets
        .filter((item) => item.type === "patch")
        .slice(0, 3)
        .flatMap((item) => item.changesets as string[]),
    ),
    features: uniq(
      changesets
        .filter((item) => item.type === "minor")
        .slice(0, 3)
        .flatMap((item) => item.changesets as string[]),
    ),
  }
}

/* -----------------------------------------------------------------------------
 * Function that ensures the tweet text is within the twitter limit
 * -----------------------------------------------------------------------------*/

const TWITTER_LIMIT = 280

enum Flag {
  Features = 1,
  Patches = 0,
}

function ensureTextLimit(
  options: TweetOptions,
  flag = Flag.Patches,
): TweetOptions {
  const text = getTweetTextImpl(options)

  if (text.length > TWITTER_LIMIT) {
    //
    const opts = { ...options }

    if (flag === Flag.Patches && opts.patches) {
      opts.patches = opts.patches.slice(0, -1)
      return ensureTextLimit(opts, Flag.Features)
    }

    if (flag === Flag.Features && opts.features) {
      opts.features = opts.features.slice(0, -1)
      return ensureTextLimit(opts, Flag.Patches)
    }
  }

  return options
}

type TweetOptions = {
  version: string
  features?: string[]
  patches?: string[]
  releaseUrl?: string
}

/* -----------------------------------------------------------------------------
 * Function to compose the tweet text
 * -----------------------------------------------------------------------------*/

function getTweetTextImpl(options: TweetOptions) {
  const { version, features, patches, releaseUrl } = options

  const text = [`Hi Guys 👋🏼, A Chakra UI release v${version} is out! 🎉`]

  if (features?.length) {
    text.push("\n 🚀 Features", ...features)
  }
  if (patches?.length) {
    text.push("\n 🐛 Bugs", ...patches)
  }
  if (releaseUrl) {
    text.push(`\n Release notes -> ${releaseUrl}`)
  }

  return text.join("\n")
}

export function getTweetText(options: TweetOptions) {
  return getTweetTextImpl(ensureTextLimit(options))
}

/* -----------------------------------------------------------------------------
 * Function to post tweet
 * -----------------------------------------------------------------------------*/

export async function postTweet(options: TweetOptions) {
  return getTwitterClient().tweetsV2.createTweet({
    text: getTweetText(options),
  })
}
