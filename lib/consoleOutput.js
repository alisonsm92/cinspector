const chalk = require('chalk');
const readline = require('readline');
const AnalysisStatus = require('./interfaces/analysisStatus');
const { getLastChar } = require('./utils/helpers');

const { log } = console;

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

const getMaintainabilityStatus = ({ status }) => `${getStatusBadge(status.maintainability)}`;

/**
 * Writes in the console the layer template provided
 * @param {String} layer
 */
const writeLayer = (layer) => log(layer);

/**
 * Clean the last line on the console
 */
const clearLastWrite = () => {
  readline.moveCursor(process.stdout, 0, -1);
  readline.clearLine(process.stdout, 0);
};

/**
 * Writes on the console the summary layers string
 * @param {Array<String>} template Array with the summary layers string
 */
const writeSummary = (template) => {
  clearLastWrite();
  template.forEach(writeLayer);
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

  const template = [
    title,
    src,
    maintainabilityStatus,
  ];

  writeSummary(template);
};

module.exports = { generateSummary };
