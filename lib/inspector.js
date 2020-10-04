const plato = require('./plato');
const { adapt } = require('../utils/cliArgsAdapter');

/**
 * @typedef {import('../lib/interfaces/args').Args} Args
 * @typedef {import('../lib/interfaces/options').Options} Options
 */

/**
 * Inspects the files and generate the reports
 * @param {Args} [args] Directory where will be store the reports
 * @returns {Promise<{options: Options, overview: Object, reports: Object}>}
 */
const inspect = async (args = {}) => {
  const options = adapt(args);
  const reports = await plato.inspect(options.filePattern, options.outputDir, options);
  const overview = plato.getOverviewReport(reports);

  return { options, overview, reports };
};

module.exports = { inspect };
