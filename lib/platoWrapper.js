const plato = require('es6-plato');
const { promisify } = require('./utils/helpers');

module.exports = {
  inspect: promisify(plato.inspect).bind(plato),
  getOverviewReport: plato.getOverviewReport,
};
