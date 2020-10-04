const yargs = require('yargs');
const { DEFAULT_HEALTHY_SCORE, DEFAULT_TITLE, DEFAULT_OUTPUT_DIR } = require('../config/constants');

const getParsedArgs = () => {
  const { argv } = yargs
    .demandCommand(1, 'Must specify the source directory to inspect')
    .usage('complexity-inspector [options] -d <output_dir> <input_files_dir>')
    .example('complexity-inspector -r -d report src', 'Inspect the files in the `src` and generate the output in `report` dir')
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
    .option('skip', {
      alias: 's',
      description: 'Skips empty lines from line count',
      type: 'boolean',
      default: false,
    })
    .option('eslint', {
      alias: 'e',
      description: 'Specify a eslintrc file for ESLint linting',
      type: 'string',
    })
    .option('jshint', {
      alias: 'r',
      description: 'Specify a jshintrc file for JSHint linting',
      type: 'string',
    })
    .option('index', {
      alias: 'i',
      description: 'Min maintainability index to consider as healthy (0-100)',
      type: 'number',
      default: DEFAULT_HEALTHY_SCORE,
      coerce: (arg) => {
        if (arg < 0 || arg > 100) throw new Error('Index value must be between 0 and 100');
      },
    })
    .help()
    .version()
    .alias('help', 'h')
    .alias('version', 'v')
    .locale('en')
    .wrap(yargs.terminalWidth());

  const [src] = argv._;

  return { src, args: argv };
};

module.exports = { getParsedArgs };
