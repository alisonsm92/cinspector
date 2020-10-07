const chalk = require('chalk');
const ora = require('ora');
const AnalysisStatus = require('./interfaces/analysisStatus');
const { getLastChar } = require('./utils/helpers');
const { disablePlatoLogs, enablePlatoLogs } = require('./utils/consoleLogWrapper');

const { log } = console;
const loading = ora();

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 * @typedef {import('../lib/interfaces/overview').Overview} Overview
 * @typedef {import('../lib/interfaces/summary').Summary} Summary
 * @typedef {import('./interfaces/analysisStatus').AnalysisStatus} AnalysisStatus
 */

const TITLE = `${chalk.bold('CInspector')}`;
const OK = chalk.inverse.bold.greenBright(' OK ');
const WARNING = chalk.inverse.bold.yellowBright(' WARNING ');
const ALERT = chalk.inverse.bold.redBright(' ALERT ');
const LOADING_TEXT = chalk.bold.whiteBright('Inspecting');
const BREAK_LINE = '\n';

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
 * @param {AnalysisStatus} status
 */
const getStatusBadge = (status) => {
  switch (status) {
    case AnalysisStatus.OK:
      return getOkBadge();
    case AnalysisStatus.WARNING:
      return getWarningBadge();
    case AnalysisStatus.ALERT:
      return getAlertBadge();
    default:
      return getOkBadge();
  }
};

/**
 * Returns the Maintainability status summary formatted
 * @param {Summary} summary
 */
const getMaintainabilityStatus = ({ status, average }) => {
  const badge = getStatusBadge(status.maintainability);
  const score = formatScore(average.maintainability);

  return `${badge} Maintainability ${score}`;
};

/**
 * Returns the SLOC status summary
 * @param {Summary} summary
 */
const getSlocStatus = ({ status, average }) => {
  const badge = getStatusBadge(status.sloc);
  const score = formatScore(average.sloc);

  return `${badge} SLOC ${score}`;
};

/**
 * Returns the ESLint status summary
 * @param {Summary} summary
 */
const getEslintStatus = ({ status, average }) => {
  const badge = getStatusBadge(status.eslint);
  const score = formatScore(average.eslint);

  return `${badge} ESLint ${score}`;
};

/**
 * Writes in the console the layer template provided
 * @param {String} layer
 */
const writeLayer = (layer) => log(layer);

/**
 * Writes on the console the summary layers string
 * @param {Array<String>} template Array with the summary layers string
 */
const writeSummary = (template) => {
  template.forEach(writeLayer);
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
  const maintainabilityStatus = getMaintainabilityStatus(overview.summary);
  const slocStatus = getSlocStatus(overview.summary);
  const eslint = getEslintStatus(overview.summary);

  const template = [
    title,
    src,
    maintainabilityStatus,
    slocStatus,
    eslint,
  ];

  writeSummary(template);
};

module.exports = { generateSummary, startLoading, stopLoading };
