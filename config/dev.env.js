'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONGIG: '"dev"',
  BASE_API: '"http://localhost:8002/BigSuperPMS/api/"'
})
