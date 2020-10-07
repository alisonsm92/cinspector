const Table = require('cli-table');

const chars = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  bottom: '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  left: '',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '',
  'right-mid': '',
  middle: ' ',
};

const style = { head: ['grey', 'bold'] };

/**
 * Builds the summary table
 * @param {Object} params
 * @param {Object} params.head
 * @param {Array} params.data
 */
const buildSummaryTable = ({ head, data }) => {
  const table = new Table({ head, chars, style });
  data.forEach((line) => table.push(line));
  return table.toString();
};

module.exports = { buildSummaryTable };
