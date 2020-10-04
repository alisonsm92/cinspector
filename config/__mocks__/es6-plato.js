const plato = jest.createMockFromModule('es6-plato');

plato.inspect = (filePattern, outputDir, options, done) => done();

module.exports = plato;
