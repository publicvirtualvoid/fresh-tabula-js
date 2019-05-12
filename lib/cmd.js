'use strict';

const path = require('path')
const spawn = require('child_process').spawn;
const _ = require('lodash');

const JAR_PATH = path.join(__dirname, 'jar/tabula-java.jar');

function TabulaCommand(pdfPath, commandArgs){
  if (!(this instanceof TabulaCommand)) {
    return new TabulaCommand(pdfPath, commandArgs);
  }

  this._build(pdfPath, commandArgs);
}

TabulaCommand.prototype.run = function () {
  return spawn('java', this.args);
};

TabulaCommand.prototype._build = function (pdfPath, commandArgs) {
  this.args = [];
  if (commandArgs && commandArgs.silent) {
    this.args = this.args.concat([
      '-Dorg.slf4j.simpleLogger.defaultLogLevel=off',
      '-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.NoOpLog',
      '-Dfile.encoding=utf-8',
    ]);
  }
  this.args = this.args.concat(['-jar', JAR_PATH]);
  _.forEach(commandArgs, (value, key) => {
    key = '--' + _.kebabCase(key);
    if (Array.isArray(value)) {
      _.forEach(value, (v) => {
        this.args.push(key, v);
      });
    } else if (typeof value === 'boolean') {
      if (value) {
        this.args.push(key);
      }
    } else {
      this.args.push(key, value);
    }
  });
  this.args = _.flatten(this.args.concat([pdfPath]));
  return this;
};

module.exports = TabulaCommand;
