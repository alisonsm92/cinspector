const { adapt } = require('./cliArgsAdapter');
const {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_TITLE,
  DEFAULT_HEALTHY_INDEX,
  DEFAULT_HEALTHY_SLOC,
  DEFAULT_HEALTHY_COMPLEXITY,
} = require('../../config/constants');

describe('Testing cliArgsAdapter.adapt', () => {
  test('Should return the options object with the using the args provided', () => {
    const args = {
      _: ['src'],
      dir: 'output',
      recurse: true,
      exclude: './node_modules',
      title: 'complexity-report',
      empty: true,
      eslint: '.eslintrc.js',
      jshint: '.jshintrc.js',
      index: 80,
      sloc: 2000,
      complexity: 4,
    };
    const expectedOptions = {
      src: args._[0],
      dir: args.dir,
      title: args.title,
      recurse: args.recurse,
      exclude: args.exclude,
      quiet: args.quiet,
      noempty: !args.empty,
      eslintrc: args.eslint,
      jshint: args.jshint,
      index: args.index,
      sloc: args.sloc,
      complexity: args.complexity,
      outputDir: `${args.dir}/${args.title}`,
    };

    const options = adapt(args);
    expect(options).toEqual(expectedOptions);
  });

  test('Should return the options object with the default values when the args is not provided',
    () => {
      const args = {};
      const expectedOptions = {
        src: undefined,
        dir: DEFAULT_OUTPUT_DIR,
        title: DEFAULT_TITLE,
        recurse: undefined,
        exclude: undefined,
        quiet: undefined,
        noempty: undefined,
        eslintrc: undefined,
        jshint: undefined,
        index: DEFAULT_HEALTHY_INDEX,
        sloc: DEFAULT_HEALTHY_SLOC,
        complexity: DEFAULT_HEALTHY_COMPLEXITY,
        outputDir: `${DEFAULT_OUTPUT_DIR}/${DEFAULT_TITLE}`,
      };

      const options = adapt(args);
      expect(options).toEqual(expectedOptions);
    });
});
