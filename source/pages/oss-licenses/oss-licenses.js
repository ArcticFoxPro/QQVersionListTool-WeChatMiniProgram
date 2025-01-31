// oss-licenses.js

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

const licensesMp = require('../utils/licenses-mp')
const licensesBuild = require('../utils/licenses-build')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        licensesMp: [], licensesBuild: [], title: "", licenseBody: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const type = options.type
        const index = options.index
        if (type === "mp") this.setData({
            licenseMp: licensesMp, title: licensesMp[index].name, licenseBody: licensesMp[index].licenseText
        }); else if (type === "build") this.setData({
            licenseBuild: licensesBuild, title: licensesBuild[index].name, licenseBody: licensesBuild[index].licenseText
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */ async onReady() {
        const windowHeight = wx.getWindowInfo().windowHeight
        const safeBottomPadding = wx.getWindowInfo().screenHeight - wx.getWindowInfo().safeArea.bottom + (32 / 750 * wx.getWindowInfo().windowWidth)

        this.setData({
            safeBottomPadding: safeBottomPadding
        });

        // 获取元素高度的函数封装
        const getElementHeight = async (selector) => {
            return new Promise((resolve) => {
                const query = wx.createSelectorQuery();
                query.select(selector).boundingClientRect();

                query.exec((res) => {
                    if (res[0]) resolve(res[0].height); else resolve(0);
                });
            });
        };

        // 获取各个元素高度
        let elementHeight1 = await getElementHeight('#titleTop1');

        this.setData({
            heightRecycle: windowHeight - elementHeight1
        });
    },

})