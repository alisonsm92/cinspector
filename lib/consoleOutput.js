const chalk = require('chalk');
const readline = require('readline');
const { getLastChar } = require('./utils/helpers');

const { log } = console;

/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 */

const TITLE = `${chalk.bold('CInspector diagnostic:')}`;
const OK = chalk.inverse.bold.greenBright(' OK ');
const WARNING = chalk.inverse.bold.yellowBright(' WARNING ');
const ALERT = chalk.inverse.bold.redBright(' ALERT ');
const BREAK_LINE = '\n';

/**
 * Returns the formatted title
 */
const getTitle = () => TITLE;

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
 * Returns the formatted header for the OK status
 * @param {Options} opt
 */
const getOkHeader = (opt) => `${OK} ${getSrc(opt)}`;

/**
 * Returns the formatted header for the WARNING status
 * @param {Options} opt
 */
const getWarningHeader = (opt) => `${WARNING} ${getSrc(opt)}`;

/**
 * Returns the formatted header for the ALERT status
 * @param {Options} opt
 */
const getAlertHeader = (opt) => `${ALERT} ${getSrc(opt)}`;

/**
 * @param {Options} opt
 * @param {Object} params.summary
 * @param {Object} params.summary.average
 * @param {Number} params.summary.average.maintainability
 */
const getStatus = (opt, { average }) => {
  if (average.maintainability > opt.index) return getOkHeader(opt);
  if (average.maintainability > (opt.index / 2)) return getWarningHeader(opt);
  return getAlertHeader(opt);
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
