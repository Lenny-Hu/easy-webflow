/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:21:46
 * @LastEditTime: 2019-09-04 18:07:45
 * @LastEditors: Please set LastEditors
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        // debug: true,
        corejs: {
          version: 3,
          proposals: true
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    // // Stage 1
    // ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    // ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
    // '@babel/plugin-proposal-do-expressions'

    // https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md

    // Stage 0
    '@babel/plugin-proposal-function-bind',

    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
    ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
    '@babel/plugin-proposal-do-expressions',

    // Stage 2
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',

    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    '@babel/plugin-proposal-json-strings'
  ]
};
