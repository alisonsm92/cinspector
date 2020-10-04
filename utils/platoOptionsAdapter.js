/**
 * @typedef {import('../lib/main').Args} Args
 */

/**
 * Adapts CLI args to Plato options
 * @param {Args} args CLI args
 */
const adapt = (args) => ({
  src: args._[0],
  dir: args.dir,
  recurse: args.recurse,
  exclude: args.exclude,
  title: args.title,
  quiet: args.quiet,
  noempty: !args.empty,
  eslint: args.eslint,
  jshint: args.jshint,
});

module.exports = { adapt };
