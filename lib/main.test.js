const plato = require('es6-plato');
const { inspect } = require('./main');
const { DEFAULT_OUTPUT_DIR, DEFAULT_ESLINTRC_FILE, FILE_PATTERN } = require('../config/constants');

jest.mock('es6-plato');
const spy = jest.spyOn(plato, 'inspect');

describe('Testing main.inspect', () => {
  test('Should call the plato inspect method passing the expected args', () => {
    const src = './src';
    const reportDir = './output';
    const eslintrc = '.eslintrc.json';
    const expectedArgs = {
      src: `${src}${FILE_PATTERN}`,
      outputDir: reportDir,
      options: { eslintrc },
    };

    inspect({ src, reportDir, eslintrc });

    expect(spy).toBeCalledWith(expectedArgs.src, expectedArgs.outputDir, expectedArgs.options);
  });

  test('Should call the plato inspect passing the default values when the args are not provided',
    () => {
      const src = './src';
      const expectedArgs = {
        src: `${src}${FILE_PATTERN}`,
        outputDir: `${src}${DEFAULT_OUTPUT_DIR}`,
        options: { eslintrc: `${src}${DEFAULT_ESLINTRC_FILE}` },
      };

      inspect({ src });

      expect(spy).toBeCalledWith(expectedArgs.src, expectedArgs.outputDir, expectedArgs.options);
    });
});
