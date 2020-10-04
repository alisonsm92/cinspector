const cli = require('../lib/cli');
const { inspect } = require('../lib/inspector');

async function execute() {
  const args = cli.getParsedArgs();

  await inspect(args);
}

execute();
