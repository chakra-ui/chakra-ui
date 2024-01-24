import fetch from 'node-fetch'
import sharp from 'sharp'

/**
 * This module was inspired by Zach Leatherman's `avatar-local-cache` library.
 * Check out https://github.com/zachleat/avatar-local-cache for a similar,
 * pre-packaged solution.
 */

export interface AvatarCacheOptions {
  /** The path to write the images to. */
  outputDirectory: string
  /** The max width of the avatars. */
  width?: number
}

export class AvatarCache {
  outputDirectory: string
  width: number

  constructor({ outputDirectory, width = 120 }: AvatarCacheOptions) {
    this.outputDirectory = outputDirectory
    this.width = width
  }

  async urlToFile(url: string, outputFileSlug: string) {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(
          `Bad status code for ${url}. ${response.status}: ${response.statusText}`,
        )
      }

      const body = await response.arrayBuffer()
      return this.processImage(body, outputFileSlug)
    } catch (error) {
      console.error(`Error processing ${url}\nError: ${error}`)
    }
  }

  private async processImage(body: ArrayBuffer, outputFileSlug: string) {
    const { width, outputDirectory } = this
    const output = `${outputDirectory}/${outputFileSlug}`

    const img = sharp(Buffer.from(body)).resize({
      width: width,
      withoutEnlargement: true,
    })
    const metadata = await img.metadata()

    await this.toJpeg(img, metadata, `${output}.jpg`)
    return `${outputFileSlug}.jpg`
  }

  private async toJpeg(
    img: sharp.Sharp,
    metadata: sharp.Metadata,
    slug: string,
  ) {
    const jpeg = metadata.format !== 'jpeg' ? img.jpeg() : img
    await jpeg.toFile(slug)
  }
}

export default AvatarCache
