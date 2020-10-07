const plato = require('es6-plato');
const analysisStatus = require('./interfaces/analysisStatus');
const { promisify } = require('./utils/helpers');

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 */

/**
 * @param {Options} opt
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.maintainability
 */
const getMaintainabilityStatus = (opt, { average }) => {
  if (average.maintainability > opt.index) return analysisStatus.OK;
  if (average.maintainability > (opt.index / 2)) return analysisStatus.WARNING;
  return analysisStatus.ALERT;
};

/**
 * Returns the plato overview with the status info
 * @param {Object} params
 * @param {Options} params.options
 * @param {Object} params.reports
 */
const getOverview = ({ options, reports }) => {
  const overview = plato.getOverviewReport(reports);
  overview.summary.status = {
    maintainability: getMaintainabilityStatus(options, overview.summary),
  };

  return overview;
};

module.exports = {
  inspect: promisify(plato.inspect).bind(plato),
  getOverview,
};
