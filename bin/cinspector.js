const cli = require('../lib/cli');
const { inspect } = require('../lib/inspector');
const { generateSummary } = require('../lib/consoleOutput');

async function execute() {
  const args = cli.getParsedArgs();
  const { options, overview } = await inspect(args);
  generateSummary({ options, overview });
}

execute();
