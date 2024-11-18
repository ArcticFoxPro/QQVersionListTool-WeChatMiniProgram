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

const extractUrls = require("extract-urls");
const JSON5 = require('json5');

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

module.exports = {
    formatTime
}

const generateAESKey = () => {
    return new Promise((resolve, reject) => {
        wx.getRandomValues({
            length: 16, success: res => {
                resolve(res.randomValues);
            }, fail: err => {
                reject(err);
            }
        });
    });
};

function getAllAPKUrl(str) {
    const urls = extractUrls(str)
    const apkUrls = Array.from(urls.filter(url => url.toLowerCase().endsWith('.apk')).reduce((uniqueUrls, url) => uniqueUrls.has(url) ? uniqueUrls : uniqueUrls.add(url), new Set()));
    return apkUrls.length ? apkUrls : null;
}

function resolveWeixinAlphaConfig(jsonString) {
    const jsonData = JSON5.parse(jsonString);
    const arm64 = jsonData["arm64"];

    const url = arm64["url"];
    const md5 = arm64["md5"];
    const versionName = arm64["versionName"];
    const version = arm64["version"];
    const direct = arm64["direct"];
    const textList = arm64["textList"]
    const recentList = arm64["recentList"]

    return {
        url: url,
        md5: md5,
        versionName: versionName,
        version: version,
        direct: direct,
        textList: textList.map(item => item.toString()),
        recentList: recentList.map(item => item.toString())
    };

}

module.exports = {
    generateAESKey: generateAESKey, getAllAPKUrl: getAllAPKUrl, resolveWeixinAlphaConfig: resolveWeixinAlphaConfig
};

