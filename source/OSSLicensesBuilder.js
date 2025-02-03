// https://github.com/ArcticFoxPro/wechat-miniprogram-oss-licenses-semiauto-gen

/*
    Copyright (c) 2025 ArcticFoxPro
    WeChat MiniProgram OSS Licenses Semi-Auto Gen is licensed under Mulan PSL v2.
    You can use this software according to the terms and conditions of the Mulan PSL v2.
    You may obtain a copy of Mulan PSL v2 at:
             http://license.coscl.org.cn/MulanPSL2
    THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
    EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
    MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
    See the Mulan PSL v2 for more details.
*/

/**
 * 此文件用于为微信小程序生成开源项目许可证 JSON 信息，并通过 JavaScript `module.exports` 语句导出为 JS 对象。
 *
 * 每次小程序发布前均需手动执行 `node OSSLicensesBuilder.js`
 */

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const uglifyJS = require('uglify-js');
const JSON5 = require('json5');

function normalizeLineEndings(content) {
    return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function writeFileCrossPlatform(filePath, content) {
    const normalized = normalizeLineEndings(content);
    const cleanContent = normalized.charCodeAt(0) === 0xFEFF ? normalized.slice(1) : normalized;
    fs.writeFileSync(filePath, cleanContent, {
        encoding: 'utf8', flag: 'w', mode: 0o644
    });
}

function runCommand(command, args) {
    const isWindows = process.platform === 'win32';
    const sanitizedArgs = args.map(arg => {
        return isWindows ? arg.replace(/\//g, '\\') : arg;
    });
    try {
        const result = shell.exec(`${command} ${sanitizedArgs.join(' ')}`, {
            silent: true, env: {...process.env, LC_ALL: 'C.UTF-8'}
        });
        if (result.code !== 0) throw new Error(result.stderr || `Command failed with code ${result.code}`);
        return normalizeLineEndings(result.stdout);
    } catch (error) {
        console.error(`[构建错误] ${error.message}`);
        process.exit(1);
    }
}

/**
 * 生成并保存项目依赖的许可证信息
 *
 * 该函数通过执行外部命令获取项目依赖的许可证信息，并将其保存为 JSON 和 JS 文件
 * 执行完成后，会删除 JSON 文件，仅保留 JS 文件
 *
 * @param {string} outputFile - 输出文件的名称，不包含文件扩展名
 * @param {string} customFormat 指定输出许可证信息格式，必填
 * @param {string} customPath - 指定依赖项的自定义路径
 * @param {string} [startPath=''] - 可选参数，指定从哪个路径开始查找依赖项，默认为当前目录
 */
function buildLicenses(outputFile, customFormat, customPath, startPath = '') {
    const outputDir = path.join(__dirname, customPath);
    shell.mkdir('-p', outputDir);
    const jsonFile = path.join(outputDir, `${outputFile}.json`);
    const jsFile = path.join(outputDir, `${outputFile}.js`);
    try {
        const output = runCommand('license-checker-rseidelsohn', [startPath, '--customPath', customFormat, '--json']);
        const jsonData = JSON.parse(output);
        if (Object.keys(jsonData).length === 0) throw new Error('生成的许可证数据为空');
        writeFileCrossPlatform(jsonFile, output);
        const jsContent = `module.exports = ${JSON.stringify(jsonData, null, 2)};`;
        const minifiedResult = uglifyJS.minify(jsContent, {
            mangle: {toplevel: true}, compress: {
                sequences: true, dead_code: true, drop_debugger: true, unsafe: false
            }, output: {
                beautify: false, comments: false, max_line_len: 0
            }
        });
        if (minifiedResult.error) throw minifiedResult.error;
        writeFileCrossPlatform(jsFile, minifiedResult.code);
    } finally {
        if (fs.existsSync(jsonFile)) {
            shell.rm('-f', jsonFile);
        }
    }
}

function main() {
    if (!shell.which('license-checker-rseidelsohn')) {
        console.error('请先安装 license-checker-rseidelsohn: yarn add license-checker-rseidelsohn');
        process.exit(1);
    }
    if (!shell.which('json5')) {
        console.error('请先安装 json5: yarn add json5');
        process.exit(1);
    }
    const configPath = path.join(__dirname, 'OSSLicensesBuilderConfig.json5');
    if (!fs.existsSync(configPath)) {
        console.error(`找不到配置文件: ${configPath}`);
        process.exit(1);
    }
    try {
        const configs = JSON5.parse(fs.readFileSync(configPath, 'utf8'));
        for (const config of configs) if (config["startPath"] === undefined) buildLicenses(config["outputFile"], config["customFormat"], config["customPath"]); else buildLicenses(config["outputFile"], config["customFormat"], config["customPath"], config["startPath"]);
    } catch (error) {
        console.error(`构建失败: ${error.message}`);
        process.exit(1);
    }
}

process.on('uncaughtException', (err) => {
    console.error('未捕获异常:', err);
    process.exit(1);
});

main();
