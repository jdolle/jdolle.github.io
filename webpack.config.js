require('babel-core/register');

const path = require('path');
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = require(path.join(__dirname, 'webpack', `${env}.js`));
