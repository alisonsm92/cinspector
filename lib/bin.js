const cli = require('./cli');
const { inspect } = require('./main');

const execute = () => {
  const { src, args } = cli.getParsedArgs();

  inspect(src, args);
};

execute();
