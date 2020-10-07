const chalk = require('chalk');
const ora = require('ora');
const HealthStatus = require('./interfaces/healthStatus');
const { buildSummaryTable } = require('./summaryTable');
const { getLastChar } = require('./utils/helpers');
const { disablePlatoLogs, enablePlatoLogs } = require('./utils/consoleLogWrapper');

const { log } = console;
const loading = ora();

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 * @typedef {import('../lib/interfaces/overview').Overview} Overview
 * @typedef {import('./interfaces/healthStatus').HealthStatus} HealthStatus
 */

const TITLE = `${chalk.bold('CInspector')}`;
const OK = chalk.inverse.bold.greenBright(' OK ');
const WARNING = chalk.inverse.bold.yellowBright(' WARNING ');
const ALERT = chalk.inverse.bold.redBright(' ALERT ');
const LOADING_TEXT = chalk.bold.whiteBright('Inspecting');
const BREAK_LINE = '\n';
const SUMMARY_HEADER = ['Status', 'Metric', 'Score'];

/**
 * Returns the file pattern used to filter files to inspect
 * @param {Options} opt
 */
const getFilePattern = ({ recurse }) => chalk.blackBright(recurse ? '**/*.js' : '*.js');

/**
 * Returns the source directory formatted
 * @param {Options} opt
 */
const getSrc = (opt) => (getLastChar(opt.src) === '/'
  ? `${opt.src}${getFilePattern(opt)}`
  : `${opt.src}/${getFilePattern(opt)}`);

/**
 * Returns the formatted title
 */
const getTitle = () => TITLE;

/**
 * Returns the formatted badges for the OK status
 */
const getOkBadge = () => `${OK}`;

/**
 * Returns the formatted badges for the WARNING status
 */
const getWarningBadge = () => `${WARNING}`;

/**
 * Returns the formatted badges for the ALERT status
 */
const getAlertBadge = () => `${ALERT}`;

/**
 * Returns formatted score
 * @param {Number} score
 */
const formatScore = (score) => chalk.bold(score);

/**
 * Returns the maintainability status badges
 * @param {HealthStatus} status
 */
const getStatusBadge = (status) => {
  switch (status) {
    case HealthStatus.OK:
      return getOkBadge();
    case HealthStatus.WARNING:
      return getWarningBadge();
    case HealthStatus.ALERT:
      return getAlertBadge();
    default:
      return getOkBadge();
  }
};

/**
 * Returns the Maintainability status summary formatted
 * @param {Overview} overview
 */
const getMaintainabilityStatus = ({ maintainability }) => {
  const badge = getStatusBadge(maintainability.health);
  const index = formatScore(maintainability.average);

  return [badge, 'Maintainability', index];
};

/**
 * Returns the SLOC status summary
 * @param {Overview} overview
 */
const getSlocStatus = ({ sloc }) => {
  const badge = getStatusBadge(sloc.health);
  const score = formatScore(sloc.average);

  return [badge, 'SLOC', score];
};

/**
 * Returns the ESLint status summary
 * @param {Overview} overview
 */
const getEslintStatus = ({ eslint }) => {
  const badge = getStatusBadge(eslint.health);
  const score = formatScore(eslint.average);

  return [badge, 'ESLint', score];
};

/**
 * Writes in the console the layer template provided
 * @param {String} layer
 */
const writeLayer = (layer) => log(layer);

/**
 * Writes on the console the summary table
 * @param {Array} data Array with the summary table lines
 */
const writeTableSummary = (data) => {
  const head = SUMMARY_HEADER;
  const summary = buildSummaryTable({ head, data });
  writeLayer(summary);
  writeLayer(BREAK_LINE);
};

/**
 * Stars the loading spinner
 * @param {Options} options
 */
const startLoading = (options) => {
  loading.text = `${LOADING_TEXT} ${getSrc(options)} `;
  loading.start();
  disablePlatoLogs();
};

/**
 * Stops the loading spinner
 */
const stopLoading = () => {
  loading.stop();
  enablePlatoLogs();
};

/**
 * Generate the console output summary
 * @param {Object} params
 * @param {Options} params.options
 * @param {Object} params.overview
 */
const generateSummary = ({ options, overview }) => {
  const title = getTitle();
  const src = getSrc(options);
  const maintainabilityStatus = getMaintainabilityStatus(overview);
  const slocStatus = getSlocStatus(overview);
  const eslint = getEslintStatus(overview);

  writeLayer(title);
  writeLayer(src);

  const summaryData = [
    maintainabilityStatus,
    slocStatus,
    eslint,
  ];

  writeTableSummary(summaryData);
};

module.exports = { generateSummary, startLoading, stopLoading };
