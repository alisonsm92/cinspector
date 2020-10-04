const cli = require('../lib/cli');
const { inspect } = require('../lib/inspector');
const { generateSummary, writeTitle } = require('../lib/consoleOutput');

async function execute() {
  writeTitle();
  const args = cli.getParsedArgs();
  const { options, overview, reports } = await inspect(args);
  generateSummary({ options, overview, reports });
}

execute();
