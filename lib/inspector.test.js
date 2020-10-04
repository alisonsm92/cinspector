const plato = require('./plato');
const { inspect } = require('./inspector');
const { adapt } = require('../utils/cliArgsAdapter');

let spy;

beforeAll(() => {
  jest.mock('es6-plato');
  spy = jest.spyOn(plato, 'inspect');
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Testing inspector.inspect', () => {
  test('Should call the plato inspect method passing the expected args', async () => {
    const args = {
      _: ['./src'],
      dir: './output',
      title: 'report',
    };
    const options = adapt(args);
    const expectedArgs = {
      filePattern: options.filePattern,
      outputDir: options.outputDir,
      options,
    };

    await inspect(args);

    expect(spy).toBeCalledWith(
      expectedArgs.filePattern,
      expectedArgs.outputDir,
      expectedArgs.options,
    );
  });
});
