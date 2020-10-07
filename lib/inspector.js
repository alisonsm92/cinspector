const plato = require('./platoWrapper');
/**
 * @typedef {import('../lib/interfaces/options').Options} Options
 */

/**
 * Inspects the files and generate the reports
 * @param {Options} options Directory where will be store the reports
 * @returns {Promise<Object>}
 */
const inspect = async (options) => {
  const reports = await plato.inspect(options.src, options.outputDir, options);
  return plato.getOverview({ options, reports });
};

module.exports = { inspect };
