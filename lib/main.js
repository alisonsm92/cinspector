const plato = require('es6-plato');
const { adapt } = require('../utils/platoOptionsAdapter');
const {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_TITLE,
  FILE_PATTERN,
} = require('../config/constants');

/**
 * @typedef {Object} Args
 * @property {String} [dir] The output directory
 * @property {Boolean} [recurse] Recursively search directories
 * @property {String} [exclude] File exclusion regex
 * @property {String} [title] File exclusion regex
 * @property {Boolean} [quiet] Reduce output to errors only
 * @property {Boolean} [skip] Title of the report
 * @property {String} [eslint] Specify a eslintrc file for ESLint linting
 * @property {String} [jshint] Specify a jshintrc file for JSHint linting
 * @property {Number} [index] Specify the min maintainability index to consider as healthy
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
 * @param {String} src Source directory the inspect
 * @param {Args} [args] Directory where will be store the reports
 */
const inspect = (src, args = {}) => {
  const options = adapt(args);
  const filePattern = getFilePattern(src);
  const outputDir = getOutputDir({ src, outputDir: args.dir, title: args.title });

  plato.inspect(filePattern, outputDir, options);
};

module.exports = { inspect };
