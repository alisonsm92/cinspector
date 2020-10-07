/**
 * The original console log method to use on disableConsoleLog and enableConsoleLog functions
 */
const consoleLog = console.log;

/**
 * Wrapper of console log that filter the Plato log of processing files
 * @param  {...any} input
 */
const consoleLogWrapper = (...input) => {
  if (typeof input[0] === 'string' && input[0] === 'Processing ') return;
  consoleLog(input);
};

/**
 * Disables the Plato log of processing files
 * Workaround to avoiding break the loading
 */
const disablePlatoLogs = () => {
  console.log = consoleLogWrapper;
};

/**
 * Set the original console log function undoing the disableConsoleLog workaround
 */
const enablePlatoLogs = () => {
  console.log = consoleLog;
};

module.exports = { disablePlatoLogs, enablePlatoLogs };
