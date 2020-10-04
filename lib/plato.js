const plato = require('es6-plato');
const promisify = require('../utils/promisify');

/**
 * Promisify Plato inspect method
 */
const asyncInspect = promisify(plato.inspect).bind(plato);

module.exports = { inspect: asyncInspect };
