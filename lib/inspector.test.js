const plato = require('./platoWrapper');
const { inspect } = require('./inspector');
const { adapt } = require('./utils/cliArgsAdapter');

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
    const options = {
      src: './src',
      outputDir: './output/report',
    };
    const expectedArgs = {
      src: options.src,
      outputDir: options.outputDir,
      options,
    };

    await inspect(options);

    expect(spy).toBeCalledWith(
      expectedArgs.src,
      expectedArgs.outputDir,
      expectedArgs.options,
    );
  });
});
