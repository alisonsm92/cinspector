const chalk = require('chalk');
const readline = require('readline');

const { log } = console;

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 */

const TITLE = `${chalk.bold('COMPLEXITY-INSPECTOR DIAGNOSTIC:')}`;
const OK = chalk.inverse.bold.greenBright(' OK ');
const WARNING = chalk.inverse.bold.yellowBright(' WARNING ');
const ALERT = chalk.inverse.bold.redBright(' ALERT ');
const BREAK_LINE = '\n';

/**
 * Returns the formatted title
 */
const getTitle = () => TITLE;

/**
 * Returns the formatted header for the OK status
 * @param {Options} options
 */
const getOkHeader = (options) => `${OK} ${options.filePattern}`;

/**
 * Returns the formatted header for the WARNING status
 * @param {Options} options
 */
const getWarningHeader = (options) => `${WARNING} ${options.filePattern}`;

/**
 * Returns the formatted header for the ALERT status
 * @param {Options} options
 */
const getAlertHeader = (options) => `${ALERT} ${options.filePattern}`;

/**
 * @param {Options} options
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.maintainability
 */
const getStatus = (options, { average }) => {
  if (average.maintainability > options.index) return getAlertHeader(options);
  if ((options.index / 2) >= average.maintainability) return getWarningHeader(options);
  return getOkHeader(options);
};

/**
 * Writes in the console the layer template provided
 * @param {String} layer
 */
const writeLayer = (layer) => log(layer);

/**
 * Writes the lib title in the console
 */
const writeTitle = () => {
  const title = getTitle();
  writeLayer(title);
};

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
  writeLayer(BREAK_LINE);
};

/**
 * Generate the console output summary
 * @param {Object} params
 * @param {Options} params.options
 * @param {Object} params.overview
 * @param {Object} params.reports
 */
const generateSummary = ({ options, overview }) => {
  const status = getStatus(options, overview.summary);

  const template = [
    status,
  ];

  writeSummary(template);
};

module.exports = { writeTitle, generateSummary };
