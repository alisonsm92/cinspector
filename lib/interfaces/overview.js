/**
 * @typedef {import('./healthStatus').HealthStatus} HealthStatus
 * @typedef {import('./funcSummary').FuncSummary} FuncSummary
 */

/**
  * @typedef Index
  * @property {HealthStatus} health
  * @property {Number} average
  * @property {Number} total
  */

/**
 * @typedef {Object} Overview
 * @property {Index} maintainability
 * @property {Index} sloc
 * @property {Index} eslint
 * @property {Array<FuncSummary>} functions
 */

module.exports = {};
