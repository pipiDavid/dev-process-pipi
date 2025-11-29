export function isValidSearchText(text) {
  return text && text.trim() !== ''
}

export function debounce(func, delay = 500) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
