const cli = require('./cli');
const { inspect } = require('./main');

const execute = () => {
  const args = cli.getParsedArgs();

  inspect(args);
};

execute();
