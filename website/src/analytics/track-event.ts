const _window = window as typeof window & { gtag: any }

export function trackPageview(url: string) {
  try {
    _window.gtag("config", process.env.GA_TRACKING_ID, {
      page_location: url,
      page_title: document.title,
    })
  } catch (err) {
    console.error("Failed sending metrics", err)
  }
}

type TrackEventOptions = {
  action: any
  category: string
  label: string
  value: string
}

export function trackEvent(options: TrackEventOptions) {
  const { action, category, label, value } = options
  try {
    _window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    })
  } catch (err) {
    console.error("Failed sending metrics", err)
  }
}
