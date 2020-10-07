/**
 * @typedef {import('./healthStatus').HealthStatus} HealthStatus
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
 */

module.exports = {};
