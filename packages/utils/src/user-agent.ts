import { isBrowser } from "./dom"

function getUserAgentBrowser(ua: string) {
  const android = /Android/.test(ua)
  switch (true) {
    case /CriOS/.test(ua):
      return "Chrome for iOS"
    case /Edge/.test(ua):
      return "Edge"
    case android && /Silk\//.test(ua):
      return "Silk"
    case /Chrome/.test(ua):
      return "Chrome"
    case /Firefox/.test(ua):
      return "Firefox"
    case android:
      return "AOSP"
    case /MSIE|Trident/.test(ua):
      return "IE"
    case /Safari\//.test(ua):
      return "Safari"
    case /AppleWebKit/.test(ua):
      return "WebKit"
    default:
      return ""
  }
}

function getUserAgentOS(ua: string) {
  switch (true) {
    case /Android/.test(ua):
      return "Android"
    case /iPhone|iPad|iPod/.test(ua):
      return "iOS"
    case /Windows/.test(ua):
      return "Windows"
    case /Mac OS X/.test(ua):
      return "Mac"
    case /CrOS/.test(ua):
      return "Chrome OS"
    case /Firefox/.test(ua):
      return "Firefox OS"
    default:
      return ""
  }
}

export function detectOS(string: string) {
  if (!isBrowser) return false
  const ua = window.navigator.userAgent
  return getUserAgentOS(ua) === string
}

export function detectBrowser(string: string) {
  if (!isBrowser) return false
  const ua = window.navigator.userAgent
  return getUserAgentBrowser(ua) === string
}
