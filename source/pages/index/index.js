// index.js

/*
    Copyright (c) 2024 ArcticFoxPro
    QQ Ver. Lite is licensed under Mulan PubL v2.
    You can use this software according to the terms and conditions of the Mulan PubL v2.
    You may obtain a copy of Mulan PubL v2 at:
             http://license.coscl.org.cn/MulanPubL-2.0
    THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
    EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
    MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
    See the Mulan PubL v2 for more details.
*/

import Message from 'tdesign-miniprogram/message/index';

const QQVersionBean = require('./QQVersionBean.js');

Page({
    options: {
        styleIsolation: 'apply-shared',
    }, data: {
        qqVersions: [],
        onRefresh: false,
        refreshIcon: "refresh",
        versionSmallVisible: wx.getStorage({
            key: "versionSelect", success(res) {
                //console.log(res.data)
            }
        }),
        seeJson: "查看 JSON 字符串",
        heightRecycle: 5000,
        errorText: "",
        UADisagreeText: "不同意并退出",
        titleOpacity: 0,
        guessTabDefault: 0,
        wechatVersionBig: "",
        wechatVersionTrue: "",
        wechatVersion16code: "",
        wetypeVersionBig: "",
        wetypeVersionLink: "",
        loadingVisible: false,
        continueGuessing: false,
        successGuessedLink: "",
        guessSuccessVisible: false,
    }, onLoad: function () {
        this.setData({
            PerProSwitch: wx.getStorageSync('isPerProOn')
        });
        this.setData({
            wechatVersionBig: wx.getStorageSync('wechatVersionBig')
        });
        this.setData({
            wechatVersionTrue: wx.getStorageSync('wechatVersionTrue')
        });
        this.setData({
            wechatVersion16code: wx.getStorageSync('wechatVersion16code')
        });
        this.setData({
            wetypeVersionBig: wx.getStorageSync('wetypeVersionBig')
        });
        this.setData({
            wetypeVersionLink: wx.getStorageSync('wetypeVersionLink')
        });
        if (wx.getStorageSync('isThrottleOn') === false) {
            this.setData({
                ThrottleSwitch: false
            })
        } else if (wx.getStorageSync('isThrottleOn') === "" || wx.getStorageSync('isThrottleOn') === true) {
            this.setData({
                ThrottleSwitch: true
            })
        }
        if (wx.getStorageSync('guessTabDefault') !== '') {
            this.setData({
                guessTabDefault: wx.getStorageSync('guessTabDefault')
            });
        }
    }, onReady: async function () {
        const windowHeight = await new Promise((resolve) => {
            wx.getSystemInfo({
                success: (res) => {
                    resolve(res.windowHeight);
                },
            });
        });

        let elementHeight1, elementHeight2, elementHeight3;

        // 获取元素高度的函数封装
        const getElementHeight = async (selector) => {
            return new Promise((resolve) => {
                const query = wx.createSelectorQuery();
                query.select(selector).boundingClientRect();

                query.exec((res) => {
                    if (res[0]) {
                        resolve(res[0].height);
                    } else {
                        //console.log('未找到对应的元素：', selector);
                        resolve(0); // 如果找不到元素，返回默认值0
                    }
                });
            });
        };

        // 获取各个元素高度
        elementHeight1 = await getElementHeight('#titleTop1');
        elementHeight2 = await getElementHeight('#titleTop2');
        elementHeight3 = await getElementHeight('#bottomButton');

        //console.log('窗口高度：', windowHeight);
        //console.log('元素高度1：', elementHeight1);
        //console.log('元素高度2：', elementHeight2);
        //console.log('元素高度3：', elementHeight3);
        //console.log('元素高度2：', windowHeight - elementHeight1 - elementHeight3);

        this.setData({
            heightRecycle: windowHeight - elementHeight1 - elementHeight3
        });

        this.setData({
            largeTitleTopHeight: elementHeight2
        });

        if (wx.getStorageSync('UAAgreed') === "") {
            this.setData({
                UAVisible: true
            });
        }

        this.getData();
    }, onunload: function () {
        this.stopGuessing();
    }, refreshData: function () {
        this.getData();
    }, copyOSLink() {
        this.copyUtil('https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram');
    }, getData: function () {
        this.setData({
            refreshIcon: null,
        });
        this.setData({
            onRefresh: true,
        });
        wx.request({
            url: 'https://im.qq.com/rainbow/androidQQVersionList', method: 'GET', success: (res) => {
                try {
                    let responseData = res.data;
                    //console.log(responseData);
                    let start = responseData.indexOf("versions64\":[") + 12;
                    let end = responseData.indexOf(";\n" + "      typeof");
                    let totalJson = responseData.substring(start, end);
                    let qqVersionJsons = totalJson.split("},{").reverse();

                    let qqVersionList = [];
                    for (let jsonStr of qqVersionJsons) {
                        let pstart = jsonStr.indexOf("{\"versions");
                        let pend = jsonStr.indexOf(",\"length");
                        let json = jsonStr.substring(pstart, pend);

                        let qqVersionBean = JSON.parse(json);

                        qqVersionList.push(qqVersionBean);
                    }

                    this.setData({
                        qqVersions: qqVersionList,
                    });
                    this.setData({
                        onRefresh: false,
                    });
                    this.setData({
                        refreshIcon: "refresh",
                    });

                    let maxSizeInFloat = qqVersionList.map(qv => parseFloat(qv.size)).filter(isFinite).reduce((max, current) => Math.max(max, current), -Infinity);


                    this.setData({
                        maxSize: maxSizeInFloat
                    })

                    this.setData({
                        versionBig: qqVersionList[0].versionNumber
                    })
                } catch (e) {
                    this.setData({
                        onRefresh: false,
                    });
                    this.setData({
                        refreshIcon: "refresh",
                    });
                    //console.error(e);
                    const errorMessage = e.errMsg;
                    this.setData({
                        errorText: errorMessage
                    });
                    this.setData({
                        errorVisible: true
                    });
                }
            }, fail: (err) => {
                this.setData({
                    onRefresh: false,
                });
                this.setData({
                    refreshIcon: "refresh",
                });
                //console.error(err);
                const errorMessage = err.errMsg;
                this.setData({
                    errorText: errorMessage
                });
                this.setData({
                    errorVisible: true
                });

            },
        });
    }, aboutPopupVisible(e) {
        this.setData({
            aboutVisible: e.detail.visible,
        });
    }, handleAboutPopup() {
        this.setData({
            aboutVisible: true
        });
    }, closeAboutPopup() {
        this.setData({
            aboutVisible: false
        });
    }, recallUA() {
        this.setData({
            UADisagreeText: "撤回同意并退出"
        });
        this.setData({
            aboutVisible: false
        });
        this.setData({
            UAVisible: true
        });
    }, guessPopupVisible(e) {
        this.setData({
            guessVisible: e.detail.visible,
        }, () => {
            const tabs = this.selectComponent('tabs');
            tabs.setTrack();
        });
    }, handleGuessPopup() {
        this.setData({
            guessVisible: true
        });
    }, closeGuessPopup() {
        this.setData({
            guessVisible: false
        });
    }, copyAndroidOSLink() {
        this.setData({
            guessVisible: false
        });
        this.copyUtil('https://github.com/klxiaoniu/QQVersionList');
    }, clickCell(e) {
        //console.log(e.currentTarget.dataset.index);
        const index = e.currentTarget.dataset.index;
        //this.setData({selectCell:index})
        this.setData({
            itemVersion: this.data.qqVersions[index].versionNumber
        });
        this.setData({
            itemSize: this.data.qqVersions[index].size
        });
        this.setData({
            itemFeatureTitle: this.data.qqVersions[index].featureTitle
        });
        //console.log(this.data.qqVersions[index].summary);
        this.setData({
            itemSummary: this.data.qqVersions[index].summary
        });
        this.setData({
            itemString: JSON.stringify(this.data.qqVersions[index], null, 2)
        });
        this.setData({
            cellDetailVisible: true
        });
        this.setData({
            preSize: ((parseFloat(this.data.itemSize) / parseFloat(this.data.maxSize)) * 100).toFixed(2)
        })
    }, closeCellDetailPopup() {
        this.setData({
            cellDetailVisible: false
        });
    }, displayJson() {
        this.setData({
            cellDetailVisible: false
        });

        this.setData({
            cellJsonDetailVisible: true
        });
    }, closeCellJsonDetailPopup() {
        this.setData({
            cellJsonDetailVisible: false
        });
    }, copyCellJsonDetailPopup() {
        this.copyUtil(this.data.itemString);
    }, cellDetialPopupVisible(e) {
        this.setData({
            cellDetailVisible: e.detail.visible,
        });
    }, cellJsonDetialPopupVisible(e) {
        this.setData({
            cellJsonDetailVisible: e.detail.visible,
        });
    }, titleChange(e) {
        let opa = 0;
        if (e.detail.scrollTop >= 0) {
            opa = (e.detail.scrollTop - this.data.largeTitleTopHeight / 2) * 2 / this.data.largeTitleTopHeight;
        }
        if (opa < 0) opa = 0; else if (opa > 1) opa = 1;

        this.setData({
            titleOpacity: opa,
        });

    }, errorPopupVisible(e) {
        this.setData({
            errorVisible: e.detail.visible,
        });
    }, closeErrorPopup() {
        this.setData({
            errorVisible: false
        });
    }, copyError() {
        this.copyUtil(this.data.errorText);
    }, UAPopupVisible(e) {
        this.setData({
            UAVisible: e.detail.visible,
        });
    }, UAAgree() {
        wx.setStorageSync('UAAgreed', true);
        this.setData({
            UAVisible: false
        })
    }, UADisagree() {
        wx.clearStorageSync()
        wx.exitMiniProgram({
            success: () => {
            }
        })
    }, settingPopupVisible(e) {
        this.setData({
            settingVisible: e.detail.visible,
        });
    }, handleSettingPopup() {
        if (wx.getStorageSync('isPerProOn') === "" || wx.getStorageSync('isPerProOn') === false) {
            this.setData({
                PerProSwitch: false
            })
        } else if (wx.getStorageSync('isPerProOn') === true) {
            this.setData({
                PerProSwitch: true
            })
        }
        this.setData({
            settingVisible: true
        });
    }, closeSettingPopup() {
        this.setData({
            settingVisible: false
        });
    }, handlePerProChange(e) {
        wx.setStorageSync('isPerProOn', e.detail.value);
        this.setData({
            PerProSwitch: e.detail.value
        })
    }, handleThrottleChange(e) {
        wx.setStorageSync('isThrottleOn', e.detail.value);
        this.setData({
            ThrottleSwitch: e.detail.value
        })
    }, onTabsChange(e) {
        this.setData({
            guessTabDefault: e.detail.value
        })
        wx.setStorageSync('guessTabDefault', e.detail.value);
    }, onInputWeChatBig(e) {
        this.setData({
            wechatVersionBig: e.detail.value
        });
    }, onInputWeChatTrue(e) {
        this.setData({
            wechatVersionTrue: e.detail.value
        });
    }, onInputWeChat16code(e) {
        this.setData({
            wechatVersion16code: e.detail.value
        });
    }, onInputWeTypeBig(e) {
        this.setData({
            wetypeVersionBig: e.detail.value
        });
    }, onInputWeTypeLink(e) {
        this.setData({
            wetypeVersionLink: e.detail.value
        });
    }, startWeChatGuess() {
        const wechatVersionBig = this.data.wechatVersionBig;
        const wechatVersionTrue = this.data.wechatVersionTrue;
        const wechatVersion16code = this.data.wechatVersion16code;
        if (wechatVersionBig === '' || wechatVersionTrue === '' || wechatVersion16code === '') {
            this.setData({
                errorText: '存在未填写的参数，请检查内容是否填写完毕'
            });
            this.setData({
                errorVisible: true
            });
        } else {
            this.closeGuessPopup();
            wx.setStorageSync('wechatVersionBig', wechatVersionBig);
            wx.setStorageSync('wechatVersionTrue', wechatVersionTrue);
            wx.setStorageSync('wechatVersion16code', wechatVersion16code);
            this.guessUrl(wechatVersionBig, wechatVersionTrue, wechatVersion16code, 'WeChat').then(r => {
            })
        }
    }, startWeTypeGuess() {
        const wetypeVersionBig = this.data.wetypeVersionBig;
        const wetypeVersionLink = this.data.wetypeVersionLink;
        if (wetypeVersionBig === '' || wetypeVersionLink === '') {
            this.setData({
                errorText: '存在未填写的参数，请检查内容是否填写完毕'
            });
            this.setData({
                errorVisible: true
            });
        } else {
            this.closeGuessPopup();
            wx.setStorageSync('wetypeVersionBig', wetypeVersionBig);
            wx.setStorageSync('wetypeVersionLink', wetypeVersionLink);
            this.guessUrl(wetypeVersionBig, wetypeVersionLink, '', 'WeType').then(r => {
            })
        }
    }, async fetchLink(url) {
        return new Promise((resolve, reject) => {
            wx.request({
                url, method: 'HEAD', success: function (res) {
                    resolve(res.statusCode === 200);
                }, fail: function (err) {
                    reject(err);
                }
            });
        });
    }, async guessUrl(versionBig, versionSuf, version16code, mode) {
        let guessedLink = '';
        let v16codeStr = version16code;
        let vSuf = versionSuf;
        this.setData({
            continueGuessing: 'STATUS_ONGOING'
        });
        let timerId;

        const guess = () => {
            if (this.data.continueGuessing === 'STATUS_ONGOING') {
                if (mode === 'WeChat') {
                    guessedLink = `https://dldir1.qq.com/weixin/android/weixin${versionBig}android${versionSuf}_0x${v16codeStr}_arm64.apk`;
                } else if (mode === 'WeType') {
                    guessedLink = `https://download.z.weixin.qq.com/app/android/${versionBig}/wxkb_${vSuf}_32.apk`;
                }
                //console.log(`正在猜测下载地址：${guessedLink}`);
                this.setData({
                    loadingVisible: true
                });
                this.setData({
                    guessSuccessVisible: false
                });
                this.setData({
                    updateProgressDialogMessage: `正在猜测下载地址：${guessedLink}`
                })
                this.fetchLink(guessedLink).then(isSuccess => {
                    if (isSuccess) {
                        this.setData({
                            successGuessedLink: guessedLink
                        });
                        this.setData({
                            guessSuccessVisible: true
                        });
                        if (mode === 'WeChat') v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16); else if (mode === 'WeType') vSuf = (Number(vSuf) + 1).toString();
                        timerId = setTimeout(guess, 100);
                        this.setData({
                            continueGuessing: 'STATUS_PAUSE'
                        });
                    } else {
                        if (mode === 'WeChat') v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16); else if (mode === 'WeType') vSuf = (Number(vSuf) + 1).toString();
                        timerId = setTimeout(guess, 100);
                    }
                }).catch(err => {
                    console.error(err);
                    const errorMessage = err.errMsg;
                    this.setData({
                        errorText: errorMessage
                    });
                    this.setData({
                        errorVisible: true
                    });
                });
            } else if (this.data.continueGuessing === 'STATUS_PAUSE') {
                timerId = setTimeout(guess, 100);
            } else if (this.data.continueGuessing === 'STATUS_END') {
                this.setData({
                    loadingVisible: false
                });
                this.setData({
                    guessSuccessVisible: false
                });
                Message.info({
                    context: this,
                    offset: [90, 32],
                    duration: 1500,
                    icon: false,
                    single: false,
                    content: '已停止猜测',
                    align: 'center'
                });
                clearTimeout(timerId);
                timerId = null;
            }
        };

        clearTimeout(timerId); // 清除之前的定时器
        timerId = setTimeout(guess, 0);
    }, cancelGuess() {
        this.setData({
            continueGuessing: 'STATUS_END'
        });
        clearTimeout(this.timerId);
    }, continueGuess() {
        this.setData({
            continueGuessing: 'STATUS_ONGOING'
        });
    }, copyGuessSuccess() {
        this.copyUtil(this.data.successGuessedLink);
        setTimeout(() => {
            this.setData({
                continueGuessing: 'STATUS_END'
            });
        }, 100)
    }, guessSuccessPopupVisible(e) {
        this.setData({
            guessSuccessVisible: e.detail.visible,
        });
    },copyUtil(copyData){
        const that = this;
        wx.setClipboardData({
            data: copyData, success(res) {
                setTimeout(() => {
                    wx.showToast({title: '', duration: 0, icon: 'none'});
                    wx.hideToast();
                }, 0)
                Message.success({
                    context: that,
                    offset: [90, 32],
                    duration: 1500,
                    icon: false,
                    single: false,
                    content: `已复制：${copyData}`,
                    align: 'center'
                });
            }, fail: function (res) {
            }
        })
    },
})