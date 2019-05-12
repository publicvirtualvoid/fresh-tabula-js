'use strict';

const cmd = require('./cmd');
const hp = require('highland-process');

function Tabula(pdfPath, options) {
  if (!(this instanceof Tabula)) {
    return new Tabula(pdfPath, options);
  }

  this.pdfPath = pdfPath;
  this.options = options;
}

Tabula.prototype.streamCsv = function () {
  return hp
    .from(cmd(this.pdfPath, this.options)
    .run());
};

Tabula.prototype.extractCsv = function (cb) {
  this.streamCsv()
    .map(data => data.toString())
    .split()
    .collect()
    .stopOnError(err => cb(err, null))
    .each(data => cb(null, data));
};

module.exports = Tabula;
