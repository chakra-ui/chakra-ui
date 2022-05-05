import { mockCookieStorage } from "./cookie"
import { mockImage } from "./image"
import { mockLocalStorage } from "./localstorage"
import { mockMatchMedia } from "./match-media"

export const mocks = {
  image: mockImage,
  cookie: mockCookieStorage,
  localStorage: mockLocalStorage,
  matchMedia: mockMatchMedia,
}
