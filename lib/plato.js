const plato = require('es6-plato');
const promisify = require('./utils/promisify');

module.exports = {
  inspect: promisify(plato.inspect).bind(plato),
  getOverviewReport: plato.getOverviewReport,
};
