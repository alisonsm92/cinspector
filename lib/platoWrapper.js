const plato = require('es6-plato');
const analysisStatus = require('./interfaces/analysisStatus');
const { promisify } = require('./utils/helpers');

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 */

/**
 * Returns the maintainability analysis status based on the max value defined
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
 * Returns the SLOC analysis status based on the max value defined
 * @param {Options} opt
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.sloc
 */
const getSlocStatus = (opt, { average }) => {
  if (average.sloc < opt.sloc) return analysisStatus.OK;
  if (average.sloc < (opt.sloc * 2)) return analysisStatus.WARNING;
  return analysisStatus.ALERT;
};

/**
 * Returns the Eslint analysis status based on the max value defined
 * @param {Options} _
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.maintainability
 */
const getEslintStatus = (_, { average }) => {
  if (average.maintainability > 1) return analysisStatus.OK;
  if (average.maintainability > 0) return analysisStatus.WARNING;
  return analysisStatus.OK;
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
    sloc: getSlocStatus(options, overview.summary),
    eslint: getEslintStatus(options, overview.summary),
  };

  return overview;
};

module.exports = {
  inspect: promisify(plato.inspect).bind(plato),
  getOverview,
};
