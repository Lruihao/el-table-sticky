/**
 * Check if the input value is a normal number
 * @param {*} value input value
 * @returns {Boolean} is normal number
 */
export function isNormalNumber(value) {
  const numberValue = Number(value)
  return !isNaN(numberValue) && isFinite(numberValue)
}
