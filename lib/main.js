const plato = require('es6-plato');
const {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_ESLINTRC_FILE,
  FILE_PATTERN,
} = require('../config/constants');

/**
 * Returns the default directory to store the reports output
 * @param {String} src Source directory
 */
const defaultOutputDir = (src) => `${src}${DEFAULT_OUTPUT_DIR}`;

/**
 * Returns the default directory to look for .eslintrc file
 * @param {String} src Source directory
 */
const defaultEslintDir = (src) => `${src}${DEFAULT_ESLINTRC_FILE}`;

/**
 * Returns the file pattern to inspect
 * @param {String} src Source directory
 */
const makeFilePattern = (src) => `${src}${FILE_PATTERN}`;

/**
 * Inspects the files and generate the reports
 * @param {Object} args
 * @param {String} args.src Source directory the inspect
 * @param {Object} [args.reportDir] Directory where will be store the reports
 * @param {Object} [args.eslintrc] Directory to .eslintrc file
 */
const inspect = ({ src, reportDir, eslintrc }) => {
  const filePattern = makeFilePattern(src);
  const outputDir = reportDir || defaultOutputDir(src);
  const options = { eslintrc: eslintrc || defaultEslintDir(src) };

  plato.inspect(filePattern, outputDir, options);
};

module.exports = { inspect };
