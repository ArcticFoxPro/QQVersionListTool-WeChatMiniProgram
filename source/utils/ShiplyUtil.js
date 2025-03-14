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

async function getAESKey() {
    return await generateAESKey();
}

module.exports = {
    generateAESKey: generateAESKey,
    getAESKey: getAESKey
};