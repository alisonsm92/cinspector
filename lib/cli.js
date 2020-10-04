const yargs = require('yargs');
const {
  DEFAULT_TITLE,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_HEALTHY_INDEX,
  DEFAULT_HEALTHY_SLOC,
  DEFAULT_HEALTHY_COMPLEXITY,
} = require('../config/constants');

const getParsedArgs = () => {
  const { argv } = yargs
    .demandCommand(1, 'Must specify the source directory to inspect')
    .usage('cinspector [options] -d <output_dir> <input_files_dir>')
    .example('cinspector -r -d report src', 'Inspect the files in the `src` and generate the output in `report` dir')
    .option('dir', {
      alias: 'd',
      description: 'The output directory',
      type: 'string',
      default: DEFAULT_OUTPUT_DIR,
    })
    .option('recurse', {
      alias: 'r',
      description: 'Recursively search directories',
      type: 'boolean',
      default: false,
    })
    .option('exclude', {
      alias: 'x',
      description: 'File exclusion regex',
      type: 'string',
    })
    .option('title', {
      alias: 't',
      description: 'Title of the report',
      type: 'string',
      default: DEFAULT_TITLE,
    })
    .option('quiet', {
      alias: 'q',
      description: 'Reduce output to errors only',
      type: 'boolean',
      default: false,
    })
    .option('empty', {
      alias: 'e',
      description: 'Consider empty lines from line count',
      type: 'boolean',
      default: true,
    })
    .option('eslint', {
      alias: 'l',
      description: 'Specify a eslintrc file for ESLint linting',
      type: 'string',
    })
    .option('jshint', {
      alias: 'h',
      description: 'Specify a jshintrc file for JSHint linting',
      type: 'string',
    })
    .option('index', {
      alias: 'i',
      description: 'Min maintainability index to consider as healthy (0-100)',
      type: 'number',
      default: DEFAULT_HEALTHY_INDEX,
      coerce: (arg) => {
        if (arg !== undefined && (arg < 0 || arg > 100)) throw new Error('Invalid min maintainability index value');
      },
    })
    .option('sloc', {
      alias: 's',
      description: 'Max source lines of code to consider as healthy',
      type: 'number',
      default: DEFAULT_HEALTHY_SLOC,
      coerce: (arg) => {
        if (arg !== undefined && arg < 0) throw new Error('Invalid max SLOC value');
      },
    })
    .option('complexity', {
      alias: 'c',
      description: 'Max cyclomatic complexity score to consider as healthy',
      type: 'number',
      default: DEFAULT_HEALTHY_COMPLEXITY,
      coerce: (arg) => {
        if (arg !== undefined && arg < 0) throw new Error('Invalid max complexity score value');
      },
    })
    .help()
    .version()
    .alias('help', 'h')
    .alias('version', 'v')
    .locale('en')
    .wrap(yargs.terminalWidth());

  return argv;
};

module.exports = { getParsedArgs };
