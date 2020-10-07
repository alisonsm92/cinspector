const {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_TITLE,
  DEFAULT_HEALTHY_INDEX,
  DEFAULT_HEALTHY_SLOC,
  DEFAULT_HEALTHY_COMPLEXITY,
} = require('../../config/constants');

/**
 * @typedef {import('../interfaces/args').Args} Args
 * @typedef {import('../interfaces/options').Options} Options
 */

/**
 * Returns the directory to store the output report
 * @param {Object} params
 * @param {String} params.dir The output directory
 * @param {String} params.title Title of the report
 */
const formatOutputDir = ({ dir, title }) => `${dir}/${title}`;

/**
 * Adapts CLI args to Plato options
 * @param {Args} args CLI args
 * @returns {Options}
 */
const adapt = (args) => {
  const [src] = args._ || [];
  const dir = args.dir || DEFAULT_OUTPUT_DIR;
  const title = args.title || DEFAULT_TITLE;

  return {
    src,
    dir,
    title,
    recurse: args.recurse,
    exclude: args.exclude,
    quiet: args.quiet,
    noempty: args.empty !== undefined ? !args.empty : undefined,
    eslintrc: args.eslint,
    jshint: args.jshint,
    index: args.index || DEFAULT_HEALTHY_INDEX,
    sloc: args.sloc || DEFAULT_HEALTHY_SLOC,
    complexity: args.complexity || DEFAULT_HEALTHY_COMPLEXITY,
    outputDir: formatOutputDir({ dir, title }),
  };
};

module.exports = { adapt };
