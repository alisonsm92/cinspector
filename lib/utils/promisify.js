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

module.exports = promisify;
