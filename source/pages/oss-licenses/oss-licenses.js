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

import Message from 'tdesign-miniprogram/message/index';
import {createStoreBindings} from 'mobx-miniprogram-bindings';
import {store} from '../utils/MobXUtil';
import Uri from 'jsuri'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "", version: "", licenseBody: "", repoLink: "", repoType: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.storeBindings = createStoreBindings(this, {
            store, fields: {licensesBuild: 'licensesBuild'},
        });
        this.storeBindings.updateStoreBindings()

        const index = options.index
        this.setData({
            title: this.data.licensesBuild[index].name,
            version: this.data.licensesBuild[index].version,
            licenseBody: this.data.licensesBuild[index].licenseText,
            repoLink: this.data.licensesBuild[index].repository,
            repoType: (() => {
                try {
                    const url = new Uri(this.data.licensesBuild[index].repository)
                    const host = url.host().toLowerCase();
                    if (host.includes("github.com")) return "GitHub";
                    if (host.includes("gitlab.com")) return "GitLab";
                } catch (e) {
                    console.error("Invalid URL:", e);
                }
                return "Unknown";
            })()
        })
    }, onUnload() {
        this.storeBindings.destroyStoreBindings();
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
    }, copyUtil(copyData) {
        const that = this;
        wx.setClipboardData({
            data: copyData, success(res) {
                setTimeout(() => {
                    wx.showToast({
                        title: '', duration: 0, icon: 'none'
                    });
                    wx.hideToast();
                }, 0)
                Message.success({
                    context: that,
                    offset: [90, 32],
                    duration: 3000,
                    icon: false,
                    single: false,
                    content: `已复制：${copyData}`,
                    align: 'center'
                });
            }, fail: function (res) {
            }
        })
    }, copyRepo() {
        this.copyUtil(this.data.repoLink)
    }
})