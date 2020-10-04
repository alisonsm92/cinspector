const plato = require('./plato');
const { inspect } = require('./inspector');
const { adapt } = require('../utils/platoOptionsAdapter');
const { DEFAULT_OUTPUT_DIR, DEFAULT_TITLE, FILE_PATTERN } = require('../config/constants');

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
    const src = './src';
    const args = {
      _: [src],
      dir: './output',
      title: 'report',
    };
    const { src: _, ...options } = adapt(args);
    const expectedArgs = {
      src: `${src}${FILE_PATTERN}`,
      outputDir: `${args.dir}/${args.title}`,
      options,
    };

    await inspect(args);

    expect(spy).toBeCalledWith(expectedArgs.src, expectedArgs.outputDir, expectedArgs.options);
  });

  test('Should call the plato inspect passing the default values when the args are not provided',
    async () => {
      const src = './src';
      const args = { _: [src] };
      const { src: _, ...options } = adapt(args);
      const expectedArgs = {
        src: `${src}${FILE_PATTERN}`,
        outputDir: `${src}${DEFAULT_OUTPUT_DIR}/${DEFAULT_TITLE}`,
        options,
      };

      await inspect(args);

      expect(spy).toBeCalledWith(expectedArgs.src, expectedArgs.outputDir, expectedArgs.options);
    });
});
