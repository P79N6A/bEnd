/**
 * @file fecscheck.js
 * @description fecs检测文件
 * @author bEnd
 */

/* eslint-disable */
const fecs = require('fecs');
const chalk = require('chalk');
/* eslint-enable */

let options = fecs.getOptions(process.argv.slice(2));

// 检测路径为src下所有文件
options._ = ['./src/**/*'];

// 设置文件类型
options.type = 'vue, js';

/**
 * callback after check finish
 *
 * @param {boolean} success true as all files ok, or false.
 * @param {Object[]} errors data for check result.
 */
function done(success, errors) {
    let status = 0;

    if (!success || errors.length) {
        status = 1;
        console.log();
        console.log(
            `请在提交前修复所有 ${chalk.green('FECS')} 的 ${chalk.red('ERROR')} 和 ${chalk.yellow('WARNING')} 的问题`
        );
        console.log();
    }

    process.exit(status);
}

fecs.check(options, done);
