const plato = require('es6-plato');
const analysisStatus = require('./interfaces/healthStatus');
const { promisify } = require('./utils/helpers');

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 * @typedef {import('../lib/interfaces/overview').Overview} Overview
 */

/**
 * Returns the maintainability health status based on the max value defined
 * @param {Options} opt
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.maintainability
 */
const getMaintainabilityHealth = (opt, { average }) => {
  if (average.maintainability > opt.index) return analysisStatus.OK;
  if (average.maintainability > (opt.index / 2)) return analysisStatus.WARNING;
  return analysisStatus.ALERT;
};

/**
 * Returns the SLOC health status based on the max value defined
 * @param {Options} opt
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.sloc
 */
const getSlocHealth = (opt, { average }) => {
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
const getEslintHealth = (_, { average }) => {
  if (average.maintainability > 1) return analysisStatus.OK;
  if (average.maintainability > 0) return analysisStatus.WARNING;
  return analysisStatus.OK;
};

/**
 * Returns the plato overview with the status info
 * @param {Object} params
 * @param {Options} params.options
 * @param {Object} params.reports
 * @return {Overview}
 */
const getOverview = ({ options, reports }) => {
  const platoOverview = plato.getOverviewReport(reports);
  const maintainability = {
    health: getMaintainabilityHealth(options, platoOverview.summary),
    average: platoOverview.summary.average.maintainability,
    total: platoOverview.summary.total.maintainability,
  };
  const sloc = {
    health: getSlocHealth(options, platoOverview.summary),
    average: platoOverview.summary.average.sloc,
    total: platoOverview.summary.total.sloc,
  };
  const eslint = {
    health: getEslintHealth(options, platoOverview.summary),
    average: platoOverview.summary.average.eslint,
    total: platoOverview.summary.total.eslint,
  };

  return { maintainability, sloc, eslint };
};

module.exports = {
  inspect: promisify(plato.inspect).bind(plato),
  getOverview,
};
