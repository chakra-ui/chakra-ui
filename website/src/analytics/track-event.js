export function trackPageview(url) {
  try {
    setTimeout(() => {
      window.gtag("config", process.env.GA_TRACKING_ID, {
        page_location: url,
        page_title: document.title,
      })
    }, 0)
  } catch (err) {
    console.error("Failed sending metrics", err)
  }
}

export function trackEvent(options) {
  const { action, category, label, value } = options
  try {
    setTimeout(() => {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value,
      })
    }, 0)
  } catch (err) {
    console.error("Failed sending metrics", err)
  }
}
