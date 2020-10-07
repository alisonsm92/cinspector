const plato = jest.createMockFromModule('es6-plato');

plato.inspect = (filePattern, outputDir, options, done) => done();
plato.getOverviewReport = () => ({ summary: { average: {}, total: {} } });

module.exports = plato;
