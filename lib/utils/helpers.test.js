const { getLastChar } = require('./helpers');

describe('Testing helpers.getLastChar', () => {
  test('Should return the last char in a string', () => {
    const result = getLastChar('cispector');
    expect(result).toEqual('r');
  });
});
