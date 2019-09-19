/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 13:53:19
 * @LastEditTime: 2019-09-19 14:05:50
 * @LastEditors: Please set LastEditors
 */
// 规则介绍 https://stylelint.io/user-guide/rules/
module.exports = {
  'plugins': [
    'stylelint-order'
  ],
  'extends': 'stylelint-config-standard',
  'ignoreFiles': [],
  'rules': {
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['function', 'if', 'else', 'each', 'include', 'mixin', 'extend']
    }],
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'at-rule-empty-line-before': ['always', {
      'except': [
        'blockless-after-same-name-blockless',
        'first-nested'
      ],
      'ignore': ['after-comment'],
      'ignoreAtRules': ['else']
    }],
    'block-closing-brace-newline-after': ['always', {
      'ignoreAtRules': ['if', 'else']
    }],
    'unit-whitelist': ['px', 'em', 'rem', '%', 's']
  }
}
