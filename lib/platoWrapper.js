const plato = require('es6-plato');
const analysisStatus = require('./interfaces/healthStatus');
const { promisify } = require('./utils/helpers');

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 * @typedef {import('../lib/interfaces/overview').Overview} Overview
 * @typedef {import('../lib/interfaces/funcSummary').FuncSummary} FuncSummary
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
 * Returns true if the cyclomatic complexity of the report function provided is over than index
 * @param {Options} opt
 * @returns {function(Object): Boolean} opt
 */
const isCyclomaticUp = (opt) => (func) => func.cyclomatic > opt.complexity;

/**
 * Compares the cyclomatic property of the objects provided
 * Useful to sort decreasing
 * @param {Object} x
 * @param {Number} x.cyclomatic
 * @param {Object} y
 * @param {Number} y.cyclomatic
 */
const compareCyclomatic = (x, y) => {
  if (x.cyclomatic > y.cyclomatic) return -1;
  if (x.cyclomatic < y.cyclomatic) return 1;

  return 0;
};

/**
 * Returns the function summary infos
 * @param {String} file
 * @returns {function(Object): FuncSummary}
 */
const getFuncSummary = (file) => (func) => ({
  file,
  line: func.line,
  name: func.name,
  cyclomatic: func.cyclomatic,
  sloc: func.complexity.sloc.physical,
});

/**
 * Returns the report functions
 * @param {Object} report
 * @param {Object} report.info
 * @param {Object} report.complexity
 */
const getFunctions = ({ info, complexity }) => complexity.functions.map(getFuncSummary(info.file));

/**
 * Returns up to 5 functions in descending order that have cyclomatic complexity over than index
 * @param {Object} params
 * @param {Options} params.options
 * @param {Object} params.reports
 */
const getMeaningfulFunctions = ({ options, reports }) => reports
  .map(getFunctions)
  .flat()
  .filter(isCyclomaticUp(options))
  .sort(compareCyclomatic);

/**
 * Returns the plato overview with the status info
 * @param {Object} params
 * @param {Options} params.options
 * @param {Array<Object>} params.reports
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
  const functions = getMeaningfulFunctions({ options, reports });

  return {
    maintainability,
    sloc,
    eslint,
    functions,
  };
};

module.exports = {
  inspect: promisify(plato.inspect).bind(plato),
  getOverview,
};
