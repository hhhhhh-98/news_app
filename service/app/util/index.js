'use strict';
const crypto = require('crypto');

const Md5 = function() {
  const md5 = crypto.createHash('md5');
  return md5;
};
module.exports = {
  Md5:  Md5,
};
