export function trackPageview(url: string): void {
  const _window = window as typeof window & { gtag: Function }
  try {
    _window.gtag("config", process.env.GA_TRACKING_ID, {
      page_location: url,
      page_title: document.title,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed sending metrics", error)
  }
}

type TrackEventOptions = {
  action: unknown
  category: string
  label: string
  value: string
}

export function trackEvent(options: TrackEventOptions): void {
  const { action, category, label, value } = options
  const _window = window as typeof window & { gtag: Function }
  try {
    _window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed sending metrics", error)
  }
}
