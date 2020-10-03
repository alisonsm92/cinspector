const plato = jest.createMockFromModule('es6-plato');

plato.inspect = () => {};

module.exports = plato;
