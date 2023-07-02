/**
 * Convert value to px or string
 * @param {String|Number} value input value
 * @returns {String}
 */
export function convertToPx(value) {
  if (typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)) {
    return `${value}px`
  }
  return String(value)
}
