!(function () {
  try {
    var init = "${init}"
    var key = "${key}"

    function apply(value) {
      var query = "(prefers-color-scheme: dark)"
      var system = window.matchMedia(query).matches ? "dark" : "light"

      var _value = value === "system" ? system : value

      var root = document.documentElement
      var body = document.body

      var clxLight = "chakra-ui-light"
      var clxDark = "chakra-ui-dark"

      var dark = _value === "dark"
      body.classList.add(dark ? clxDark : clxLight)
      body.classList.remove(dark ? clxLight : clxDark)

      root.style.colorScheme = _value
      root.dataset.theme = _value

      return _value
    }

    var cookie = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
    var stored = cookie ? cookie[2] : null

    if (stored) {
      apply(stored)
    } else {
      document.cookie = `${key}=${apply(init)}; max-age=31536000; path=/`
    }
  } catch (err) {}
})()
