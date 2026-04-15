function cx() {
  let str = '',
    i = 0,
    arg

  for (; i < arguments.length; ) {
    if ((arg = arguments[i++]) && typeof arg === 'string') {
      str && (str += ' ')
      str += arg
    }
  }
  return str
}

export { cx }