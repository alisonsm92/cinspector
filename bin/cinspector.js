const cli = require('../lib/cli');
const { inspect } = require('../lib/inspector');
const { generateSummary, startLoading, stopLoading } = require('../lib/consoleOutput');
const { adapt } = require('../lib/utils/cliArgsAdapter');

async function execute() {
  const args = cli.getParsedArgs();
  const options = adapt(args);
  startLoading(options);
  const overview = await inspect(options);
  stopLoading();
  generateSummary({ options, overview });
}

execute();
