// OSSLicensesJSONBuild.js

/*
    Copyright (c) 2024 ArcticFoxPro
    Qverbow Vigor is licensed under Mulan PubL v2.
    You can use this software according to the terms and conditions of the Mulan PubL v2.
    You may obtain a copy of Mulan PubL v2 at:
             http://license.coscl.org.cn/MulanPubL-2.0
    THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
    EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
    MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
    See the Mulan PubL v2 for more details.
*/

/**
 * 此文件用于为微信小程序生成开源项目许可证 JSON 信息，并通过 JavaScript `module.exports` 语句导出为 JS 对象。
 *
 * 每次小程序发布前均需手动执行 `node OSSLicensesJSONBuild.js`
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(`命令执行失败: ${command}`);
    process.exit(1);
  }
}

/**
 * 生成并保存项目依赖的许可证信息
 *
 * 该函数通过执行外部命令获取项目依赖的许可证信息，并将其保存为JSON和JS文件
 * 执行完成后，会删除JSON文件，仅保留JS文件
 *
 * @param {string} outputFile - 输出文件的名称，不包含文件扩展名
 * @param {string} customPath - 指定依赖项的自定义路径
 * @param {string} [startPath=''] - 可选参数，指定从哪个路径开始查找依赖项，默认为当前目录
 */
function buildLicenses(outputFile, customPath, startPath = '') {
  const jsonFile = path.join(__dirname, `pages/utils/${outputFile}.json`);
  const jsFile = path.join(__dirname, `pages/utils/${outputFile}.js`);
  const command = `license-checker-rseidelsohn ${startPath} --customPath ${customPath} --json`;
  const output = runCommand(command);
  fs.writeFileSync(jsonFile, output, 'utf8');
  const jsonData = JSON.parse(output);
  const jsContent = `module.exports = ${JSON.stringify(jsonData, null, 2)};`;
  fs.writeFileSync(jsFile, jsContent, 'utf8');
  fs.unlinkSync(jsonFile);
}

function main() {
  const customPath = path.join(__dirname, 'pages/utils/licenseFormat.json');
  buildLicenses('licenses-build', customPath);
  buildLicenses('licenses-mp', customPath, '--start ./pages/');
}

main();
