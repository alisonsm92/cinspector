const cli = require('../lib/cli');
const { inspect } = require('../lib/inspector');

const args = cli.getParsedArgs();

inspect(args);
