const plato = require('./plato');
const { adapt } = require('../utils/platoOptionsAdapter');
const {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_TITLE,
  FILE_PATTERN,
} = require('../config/constants');

/**
 * @typedef {Object} Args
 * @property {Array} [_] Contains the source directory to inspect
 * @property {String} [dir] The output directory
 * @property {Boolean} [recurse] Recursively search directories
 * @property {String} [exclude] File exclusion regex
 * @property {String} [title] Title of the report
 * @property {Boolean} [quiet] Reduce output to errors only
 * @property {Boolean} [empty] Consider empty lines from line count
 * @property {String} [eslint] Specify a eslintrc file for ESLint linting
 * @property {String} [jshint] Specify a jshintrc file for JSHint linting
 * @property {Number} [index] Specify the min maintainability index to consider as healthy
 * @property {Number} [sloc] Max source lines of code to consider as healthy
 * @property {Number} [complexity] Max cyclomatic complexity score to consider as healthy
 */

/**
 * Returns the default directory to store the reports output
 * @param {String} src Source directory
 */
const defaultOutputDir = (src) => `${src}${DEFAULT_OUTPUT_DIR}`;

/**
 * Returns the file pattern to inspect
 * @param {String} src Source directory
 */
const getFilePattern = (src) => `${src}${FILE_PATTERN}`;

/**
 * Returns the directory to store the output report
 * @param {Object} params
 * @param {String} params.src Source directory the inspect
 * @param {String} params.outputDir Directory where will be store the report
 * @param {String} params.title Report title
 */
const getOutputDir = ({ src, outputDir, title }) => (
  `${outputDir || defaultOutputDir(src)}/${title || DEFAULT_TITLE}`
);

/**
 * Inspects the files and generate the reports
 * @param {Args} [args] Directory where will be store the reports
 * @returns {Promise}
 */
const inspect = (args = {}) => {
  const { src, ...options } = adapt(args);
  const filePattern = getFilePattern(src);
  const outputDir = getOutputDir({ src, outputDir: args.dir, title: args.title });

  return plato.inspect(filePattern, outputDir, options);
};

module.exports = { inspect };
