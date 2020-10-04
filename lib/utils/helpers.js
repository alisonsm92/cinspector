/**
 * Returns a async version of the provided function
 * @param {Function} func
 * @returns {Function}
 */
const promisify = (func) => (...args) => new Promise((resolve) => {
  const callback = (result) => resolve(result);
  args.push(callback);
  func.call(this, ...args);
});

/**
 * Returns the last char in a string
 * @param {String} str
 * @returns {String}
 */
const getLastChar = (str) => str[str.length - 1];

module.exports = { promisify, getLastChar };
