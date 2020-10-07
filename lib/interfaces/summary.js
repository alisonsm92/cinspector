/**
 * @typedef {import('./analysisStatus').AnalysisStatus} AnalysisStatus
 */

/**
 * @typedef {Object} Total
 * @property {Number} total.maintainability
 * @property {Number} total.sloc
 * @property {Number} total.eslint
 */

/**
 * @typedef {Object} Average
 * @property {Number} average.maintainability
 * @property {Number} average.sloc
 * @property {Number} average.eslint
 */

/**
 * @typedef {Object} Status
 * @property {AnalysisStatus} status.maintainability
 * @property {AnalysisStatus} status.sloc
 * @property {AnalysisStatus} status.eslint
 */

/**
 * @typedef {Object} Summary
 * @property {Object} status
 * @property {Average} average
 * @property {Total} total
 */

module.exports = {};
