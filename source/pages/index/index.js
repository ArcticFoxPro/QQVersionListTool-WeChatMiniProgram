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

const util = require('../../utils/util.js')
const QQVersionBean = require('./QQVersionBean.js');

Page({
    properties: {
        scrollTop: {
            type: Number, value: 0
        },
    }, options: {
        styleIsolation: 'apply-shared',
    }, data: {
        qqVersions: [],
        onRefresh: false,
        refreshIcon: "refresh",
        versionSmallVisible: wx.getStorage({
            key: "versionSelect", success(res) {
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
        qqVersionBig: "",
        qqVersionSmall: "",
        loadingVisible: false,
        continueGuessing: false,
        successGuessedLink: "",
        guessSuccessVisible: false,
        QQTestSwitch: false,
        suffixSettingVisible: false,
        scrollNumber: 0,
        topNum: 0
    }, onLoad: function () {
        this.setData({
            theme: wx.getSystemInfoSync().theme || 'light',
            PerProSwitch: wx.getStorageSync('isPerProOn'),
            wechatVersionBig: wx.getStorageSync('wechatVersionBig'),
            wechatVersionTrue: wx.getStorageSync('wechatVersionTrue'),
            wechatVersion16code: wx.getStorageSync('wechatVersion16code'),
            wetypeVersionBig: wx.getStorageSync('wetypeVersionBig'),
            wetypeVersionLink: wx.getStorageSync('wetypeVersionLink'),
            qqVersionBig: wx.getStorageSync('qqVersionBig'),
            qqVersionSmall: wx.getStorageSync('qqVersionSmall')
        });

        const suffixKeys = ['suffix64HB', 'suffixHB64', 'suffix64HB1', 'suffixHB164', 'suffix64HB2', 'suffixHB264', 'suffix64HB3', 'suffixHB364', 'suffix64HD', 'suffixHD64', 'suffix64HD1', 'suffixHD164', 'suffix64HD2', 'suffixHD264', 'suffix64HD3', 'suffixHD364', 'suffix64HD1HB', 'suffixHD1HB64', 'suffixTest'];
        suffixKeys.forEach(suffixKey => {
            if (wx.getStorageSync(suffixKey) === '') wx.setStorageSync(suffixKey, true);
        });

        if (wx.getStorageSync('isQQTestOn') === false || wx.getStorageSync('isQQTestOn') === "") this.setData({
            QQTestSwitch: false
        }); else if (wx.getStorageSync('isQQTestOn') === true) this.setData({
            QQTestSwitch: true
        })

        if (wx.getStorageSync('isThrottleOn') === false) this.setData({
            ThrottleSwitch: false
        }); else if (wx.getStorageSync('isThrottleOn') === "" || wx.getStorageSync('isThrottleOn') === true) this.setData({
            ThrottleSwitch: true
        })

        if (wx.getStorageSync('guessTabDefault') !== "") this.setData({
            guessTabDefault: wx.getStorageSync('guessTabDefault')
        });

        if (wx.getStorageSync('isExtendSuffixOn') === "" || wx.getStorageSync('isExtendSuffixOn') === false) this.setData({
            ExtendSuffixSwitch: false
        }); else if (wx.getStorageSync('isExtendSuffixOn') === true) this.setData({
            ExtendSuffixSwitch: true
        })

        if (wx.getStorageSync('isNot5') === "" || wx.getStorageSync('isNot5') === false) this.setData({
            Not5Switch: false
        }); else if (wx.getStorageSync('isNot5') === true) this.setData({
            Not5Switch: true
        })

        this.setData({
            suffix64HB: wx.getStorageSync('suffix64HB'),
            suffixHB64: wx.getStorageSync('suffixHB64'),
            suffix64HB1: wx.getStorageSync('suffix64HB1'),
            suffixHB164: wx.getStorageSync('suffixHB164'),
            suffix64HB2: wx.getStorageSync('suffix64HB2'),
            suffixHB264: wx.getStorageSync('suffixHB264'),
            suffix64HB3: wx.getStorageSync('suffix64HB3'),
            suffixHB364: wx.getStorageSync('suffixHB364'),
            suffix64HD: wx.getStorageSync('suffix64HD'),
            suffixHD64: wx.getStorageSync('suffixHD64'),
            suffix64HD1: wx.getStorageSync('suffix64HD1'),
            suffixHD164: wx.getStorageSync('suffixHD164'),
            suffix64HD2: wx.getStorageSync('suffix64HD2'),
            suffixHD264: wx.getStorageSync('suffixHD264'),
            suffix64HD3: wx.getStorageSync('suffix64HD3'),
            suffixHD364: wx.getStorageSync('suffixHD364'),
            suffix64HD1HB: wx.getStorageSync('suffix64HD1HB'),
            suffixHD1HB64: wx.getStorageSync('suffixHD1HB64'),
            suffixTest: wx.getStorageSync('suffixTest'),
            customSuffix: wx.getStorageSync('customSuffix')
        })
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
                        resolve(0);
                    }
                });
            });
        };

        // 获取各个元素高度
        elementHeight1 = await getElementHeight('#titleTop1');
        elementHeight2 = await getElementHeight('#titleTop2');
        elementHeight3 = await getElementHeight('#bottomButton');

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
    }, onUnload: function () {
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
                        qqVersions: qqVersionList, qqVersionBig: qqVersionList[0].versionNumber
                    });
                    wx.setStorageSync('qqVersionBig', qqVersionList[0].versionNumber);
                    this.setData({
                        onRefresh: false, refreshIcon: "refresh"
                    });

                    let maxSizeInFloat = qqVersionList.map(qv => parseFloat(qv.size)).filter(isFinite).reduce((max, current) => Math.max(max, current), -Infinity);


                    this.setData({
                        maxSize: maxSizeInFloat, versionBig: qqVersionList[0].versionNumber
                    })
                } catch (e) {
                    this.setData({
                        onRefresh: false, refreshIcon: "refresh"
                    });
                    //console.error(e);
                    const errorMessage = e.errMsg;
                    this.setData({
                        errorText: errorMessage, errorVisible: true
                    });
                }
            }, fail: (err) => {
                this.setData({
                    onRefresh: false, refreshIcon: "refresh"
                });
                //console.error(err);
                const errorMessage = err.errMsg;
                this.setData({
                    errorText: errorMessage, errorVisible: true
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
            UADisagreeText: "撤回同意并退出", aboutVisible: false, UAVisible: true
        });
    }, guessPopupVisible(e) {
        this.setData({
            guessVisible: e.detail.visible,
        });
    }, handleGuessPopup() {
        this.setData({
            guessVisible: true
        }, () => {
            this.selectComponent('#tabs').setTrack();
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
        const index = e.currentTarget.dataset.index;
        this.setData({
            itemVersion: this.data.qqVersions[index].versionNumber,
            itemSize: this.data.qqVersions[index].size,
            itemFeatureTitle: this.data.qqVersions[index].featureTitle,
            itemSummary: this.data.qqVersions[index].summary,
            itemString: JSON.stringify(this.data.qqVersions[index], null, 2),
            cellDetailVisible: true
        });
        this.setData({
            preSize: ((parseFloat(this.data.itemSize) / parseFloat(this.data.maxSize)) * 100).toFixed(2)
        }) // 需要单独 setData，否则可能传入 0
    }, closeCellDetailPopup() {
        this.setData({
            cellDetailVisible: false
        });
    }, displayJson() {
        this.setData({
            cellDetailVisible: false, cellJsonDetailVisible: true
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
            scrollNumber: e.detail.scrollTop, titleOpacity: opa,
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
        wx.setStorageSync('UAAgreed', false);
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
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isPerProOn', e.detail.value);
        this.setData({
            PerProSwitch: e.detail.value
        })
    }, handleThrottleChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isThrottleOn', e.detail.value);
        this.setData({
            ThrottleSwitch: e.detail.value
        })
    }, handleExtendSuffixChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isExtendSuffixOn', e.detail.value);
        this.setData({
            ExtendSuffixSwitch: e.detail.value
        })
    }, handleQQTestSwitchChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isQQTestOn', e.detail.value);
        this.setData({
            QQTestSwitch: e.detail.value
        })
    }, handleNot5Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isNot5', e.detail.value);
        this.setData({
            Not5Switch: e.detail.value
        })
    }, onTabsChange(e) {
        this.setData({
            guessTabDefault: e.detail.value
        })
        wx.setStorageSync('guessTabDefault', e.detail.value);
    }, onTabsClick() {
        wx.vibrateShort({
            type: 'light',
        });
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
    }, onInputQQBig(e) {
        this.setData({
            qqVersionBig: e.detail.value
        });
    }, onInputQQSmall(e) {
        this.setData({
            qqVersionSmall: e.detail.value
        })
    }, startWeChatGuess() {
        const wechatVersionBig = this.data.wechatVersionBig;
        const wechatVersionTrue = this.data.wechatVersionTrue;
        const wechatVersion16code = this.data.wechatVersion16code;
        if (wechatVersionBig === '' || wechatVersionTrue === '' || wechatVersion16code === '') {
            this.setData({
                errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
            });
        } else {
            this.closeGuessPopup();
            wx.setStorageSync('wechatVersionBig', wechatVersionBig);
            wx.setStorageSync('wechatVersionTrue', wechatVersionTrue);
            wx.setStorageSync('wechatVersion16code', wechatVersion16code);
            this.guessUrl(wechatVersionBig, wechatVersionTrue, wechatVersion16code, 'WeChat').then(r => {
            })
        }
    }, startQQGuess() {
        const qqVersionBig = this.data.qqVersionBig;
        const qqVersionSmall = this.data.qqVersionSmall;
        if ((qqVersionBig === '' && (this.data.QQTestSwitch === false || this.data.QQTestSwitch === "")) || ((qqVersionBig === '' || qqVersionSmall === '') && this.data.QQTestSwitch === true)) {
            this.setData({
                errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
            });
        } else if (qqVersionSmall % 5 !== 0 && this.data.QQTestSwitch === true && this.data.Not5Switch === false) {
            this.setData({
                errorText: '小版本号需填写 5 的倍数。如需解除此限制，请前往设置进行解除。', errorVisible: true
            });
        } else {
            this.closeGuessPopup();
            if (this.data.QQTestSwitch === true) {
                wx.setStorageSync('qqVersionSmall', qqVersionSmall);
                this.guessUrl(qqVersionBig, qqVersionSmall, '', 'QQTest').then(r => {
                })
            } else if (this.data.QQTestSwitch === false || this.data.QQTestSwitch === "") this.guessUrl(qqVersionBig, '', '', 'QQOfficial').then(r => {
            })
        }
    }, startWeTypeGuess() {
        const wetypeVersionBig = this.data.wetypeVersionBig;
        const wetypeVersionLink = this.data.wetypeVersionLink;
        if (wetypeVersionBig === '' || wetypeVersionLink === '') {
            this.setData({
                errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
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
                    if (res.header['Content-Type'] === 'application/octet-stream' || res.header['Content-Type'] === 'application/vnd.android.package-archive') {
                        const resContentLength = res.header['Content-Length']
                        const fileSizeInBytes = parseInt(resContentLength, 10);
                        const fileSize = fileSizeInBytes / (1024 * 1024);
                        resolve({
                            exists: true, fileSize: fileSize.toFixed(2)
                        });
                    } else resolve({
                        exists: false, fileSize: false
                    });
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
        const isCustomSufEmpty = wx.getStorageSync('customSuffix') !== "";
        const customSufList = isCustomSufEmpty ? wx.getStorageSync('customSuffix').split(', ') : [];
        const soListPre = ["_64", "_64_HB", "_64_HB1", "_64_HB2", "_64_HB3", "_HB_64", "_HB1_64", "_HB2_64", "_HB3_64", "_64_BBPJ", "_BBPJ_64"];
        const soList = soListPre.concat(customSufList);
        const stListPre = ["_64"];
        let sIndex = 0;

        // ["_64", "_64_HB", "_64_HB1", "_64_HB2", "_64_HB3", "_64_HD", "_64_HD1", "_64_HD2", "_64_HD3", "_64_HD1HB", "_HB_64", "_HB1_64", "_HB2_64", "_HB3_64", "_HD_64", "_HD1_64", "_HD2_64", "_HD3_64", "_HD1HB_64", "_test"]

        const suf64hb = wx.getStorageSync('suffix64HB') ? ["_64_HB"] : [];
        const suf64hb1 = wx.getStorageSync('suffix64HB1') ? ["_64_HB1"] : [];
        const suf64hb2 = wx.getStorageSync('suffix64HB2') ? ["_64_HB2"] : [];
        const suf64hb3 = wx.getStorageSync('suffix64HB3') ? ["_64_HB3"] : [];
        const suf64hd = wx.getStorageSync('suffix64HD') ? ["_64_HD"] : [];
        const suf64hd1 = wx.getStorageSync('suffix64HD1') ? ["_64_HD1"] : [];
        const suf64hd2 = wx.getStorageSync('suffix64HD2') ? ["_64_HD2"] : [];
        const suf64hd3 = wx.getStorageSync('suffix64HD3') ? ["_64_HD3"] : [];
        const suf64hd1hb = wx.getStorageSync('suffix64HD1HB') ? ["_64_HD1HB"] : [];
        const sufHb64 = wx.getStorageSync('suffixHB64') ? ["_HB_64"] : [];
        const sufHb164 = wx.getStorageSync('suffixHB164') ? ["_HB1_64"] : [];
        const sufHb264 = wx.getStorageSync('suffixHB264') ? ["_HB2_64"] : [];
        const sufHb364 = wx.getStorageSync('suffixHB364') ? ["_HB3_64"] : [];
        const sufHd64 = wx.getStorageSync('suffixHD64') ? ["_HD_64"] : [];
        const sufHd164 = wx.getStorageSync('suffixHD164') ? ["_HD1_64"] : [];
        const sufHd264 = wx.getStorageSync('suffixHD264') ? ["_HD2_64"] : [];
        const sufHd364 = wx.getStorageSync('suffixHD364') ? ["_HD3_64"] : [];
        const sufHd1hb64 = wx.getStorageSync('suffixHD1HB64') ? ["_HD1HB_64"] : [];
        const sufTest = wx.getStorageSync('suffixTest') ? ["_test"] : [];
        const stListPre2 = stListPre.concat(suf64hb, suf64hb1, suf64hb2, suf64hb3, suf64hd, suf64hd1, suf64hd2, suf64hd3, suf64hd1hb, sufHb64, sufHb164, sufHb264, sufHb364, sufHd64, sufHd164, sufHd264, sufHd364, sufHd1hb64, sufTest, customSufList);
        const stList = stListPre2.flat(Infinity)

        const guess = () => {
            switch (this.data.continueGuessing) {
                case 'STATUS_ONGOING':
                    if (mode === 'WeChat') guessedLink = `https://dldir1.qq.com/weixin/android/weixin${versionBig}android${versionSuf}_0x${v16codeStr}_arm64.apk`; else if (mode === 'WeType') guessedLink = `https://download.z.weixin.qq.com/app/android/${versionBig}/wxkb_${vSuf}_32.apk`; else if (mode === 'QQOfficial') guessedLink = `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_${versionBig}${soList[sIndex]}.apk`; else if (mode === 'QQTest') guessedLink = `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_${versionBig}.${vSuf}${stList[sIndex]}.apk`;

                    this.setData({
                        loadingVisible: true,
                        guessSuccessVisible: false,
                        updateProgressDialogMessage: `正在猜测下载地址：${guessedLink}`
                    })
                    this.fetchLink(guessedLink).then(isSuccess => {
                        if (isSuccess.exists && isSuccess.fileSize !== false) {
                            this.setData({
                                successGuessedLink: guessedLink,
                                guessSuccessVisible: true,
                                successGuessedModeShare: mode === 'WeChat' ? '微信' : mode === 'WeType' ? '微信输入法' : 'QQ',
                                succeedGuessedVersionShare: mode === 'WeChat' ? versionBig + `（${versionSuf}）` : mode === 'WeType' ? versionBig + `（${vSuf}）` : mode === 'QQOfficial' ? versionBig + ` 正式版` : versionBig + '.' + vSuf + ' 测试版',
                                succeedGuessedFileSizeShare: `（大小：${isSuccess.fileSize} MB）`,
                                successGuessedWarningShare: mode === 'QQTest' ? '鉴于 QQ 测试版可能存在不可预知的稳定性问题，您在下载及使用该测试版本之前，必须明确并确保自身具备足够的风险识别和承受能力。' : false
                            });
                            switch (mode) {
                                case 'WeChat':
                                    v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16);
                                    break;
                                case 'WeType':
                                    vSuf = (Number(vSuf) + 1).toString();
                                    break;
                                case 'QQOfficial':
                                    if (sIndex >= soList.length - 1) this.setData({
                                        continueGuessing: 'STATUS_END'
                                    }); else sIndex++;
                                    break;
                                case 'QQTest':
                                    if (sIndex >= stList.length - 1 || this.data.ExtendSuffixSwitch === false) {
                                        if (this.data.Not5Switch) vSuf = (Number(vSuf) + 1).toString(); else vSuf = (Number(vSuf) + 5).toString();
                                        sIndex = 0;
                                    } else sIndex++;
                                    break;
                            }
                            timerId = setTimeout(guess, 100);
                            this.setData({
                                continueGuessing: 'STATUS_PAUSE'
                            });
                        } else {
                            switch (mode) {
                                case 'WeChat':
                                    v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16);
                                    break;
                                case 'WeType':
                                    vSuf = (Number(vSuf) + 1).toString();
                                    break;
                                case 'QQOfficial':
                                    if (sIndex >= soList.length - 1) this.setData({
                                        continueGuessing: 'STATUS_END'
                                    }); else sIndex++;
                                    break;
                                case 'QQTest':
                                    if (sIndex >= stList.length - 1 || this.data.ExtendSuffixSwitch === false) {
                                        if (this.data.Not5Switch) vSuf = (Number(vSuf) + 1).toString(); else vSuf = (Number(vSuf) + 5).toString();
                                        sIndex = 0;
                                    } else sIndex++;
                                    break;
                            }
                            timerId = setTimeout(guess, 100);
                        }
                    }).catch(err => {
                        console.error(err);
                        const errorMessage = err.errMsg;
                        this.setData({
                            errorText: errorMessage, errorVisible: true
                        });
                    });
                    break;
                case 'STATUS_PAUSE':
                    timerId = setTimeout(guess, 100);
                    break;
                case 'STATUS_END':
                    this.setData({
                        loadingVisible: false, guessSuccessVisible: false
                    });
                    Message.info({
                        context: this,
                        offset: [90, 32],
                        duration: 3000,
                        icon: false,
                        single: false,
                        content: '已停止猜测',
                        align: 'center'
                    });
                    clearTimeout(timerId);
                    timerId = null;
                    break;
            }
        };

        clearTimeout(timerId); // 清除之前的定时器
        timerId = setTimeout(guess, 0);
    }, cancelGuess() {
        this.setData({
            loadingVisible: false, continueGuessing: 'STATUS_END'
        });
        clearTimeout(this.timerId);
    }, continueGuess() {
        this.setData({
            continueGuessing: 'STATUS_ONGOING'
        });
    }, copyGuessSuccess() {
        this.copyUtil(this.data.successGuessedLink);
        this.setData({
            guessSuccessVisible: false
        });
        setTimeout(() => {
            this.setData({
                continueGuessing: 'STATUS_END'
            });
        }, 50)
    }, copyGuessSuccessShare() {
        this.copyUtil(`Android ${this.data.successGuessedModeShare} ${this.data.succeedGuessedVersionShare}${this.data.succeedGuessedFileSizeShare}\n\n下载地址：${this.data.successGuessedLink}${this.data.successGuessedWarningShare !== false ? '\n\n' + this.data.successGuessedWarningShare : ''}`);
        this.setData({
            guessSuccessVisible: false
        });
        setTimeout(() => {
            this.setData({
                continueGuessing: 'STATUS_END'
            });
        }, 50)
    }, guessSuccessPopupVisible(e) {
        this.setData({
            guessSuccessVisible: e.detail.visible,
        });
    }, loadingPopupVisible(e) {
        this.setData({
            loadingVisible: e.detail.visible,
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
    }, suffixSettingPopupVisible(e) {
        this.setData({
            suffixSettingVisible: e.detail.visible,
        });
    }, handleSuffixSetting() {
        this.setData({
            suffixSettingVisible: true,
            settingVisible: false,
            suffix64HB: wx.getStorageSync('suffix64HB'),
            suffixHB64: wx.getStorageSync('suffixHB64'),
            suffix64HB1: wx.getStorageSync('suffix64HB1'),
            suffixHB164: wx.getStorageSync('suffixHB164'),
            suffix64HB2: wx.getStorageSync('suffix64HB2'),
            suffixHB264: wx.getStorageSync('suffixHB264'),
            suffix64HB3: wx.getStorageSync('suffix64HB3'),
            suffixHB364: wx.getStorageSync('suffixHB364'),
            suffix64HD: wx.getStorageSync('suffix64HD'),
            suffixHD64: wx.getStorageSync('suffixHD64'),
            suffix64HD1: wx.getStorageSync('suffix64HD1'),
            suffixHD164: wx.getStorageSync('suffixHD164'),
            suffix64HD2: wx.getStorageSync('suffix64HD2'),
            suffixHD264: wx.getStorageSync('suffixHD264'),
            suffix64HD3: wx.getStorageSync('suffix64HD3'),
            suffixHD364: wx.getStorageSync('suffixHD364'),
            suffix64HD1HB: wx.getStorageSync('suffix64HD1HB'),
            suffixHD1HB64: wx.getStorageSync('suffixHD1HB64'),
            suffixTest: wx.getStorageSync('suffixTest'),
            customSuffix: wx.getStorageSync('customSuffix')
        })
    }, closeSuffixSettingPopup() {
        this.setData({
            suffixSettingVisible: false,
            settingVisible: true,
            suffix64HB: wx.getStorageSync('suffix64HB'),
            suffixHB64: wx.getStorageSync('suffixHB64'),
            suffix64HB1: wx.getStorageSync('suffix64HB1'),
            suffixHB164: wx.getStorageSync('suffixHB164'),
            suffix64HB2: wx.getStorageSync('suffix64HB2'),
            suffixHB264: wx.getStorageSync('suffixHB264'),
            suffix64HB3: wx.getStorageSync('suffix64HB3'),
            suffixHB364: wx.getStorageSync('suffixHB364'),
            suffix64HD: wx.getStorageSync('suffix64HD'),
            suffixHD64: wx.getStorageSync('suffixHD64'),
            suffix64HD1: wx.getStorageSync('suffix64HD1'),
            suffixHD164: wx.getStorageSync('suffixHD164'),
            suffix64HD2: wx.getStorageSync('suffix64HD2'),
            suffixHD264: wx.getStorageSync('suffixHD264'),
            suffix64HD3: wx.getStorageSync('suffix64HD3'),
            suffixHD364: wx.getStorageSync('suffixHD364'),
            suffix64HD1HB: wx.getStorageSync('suffix64HD1HB'),
            suffixHD1HB64: wx.getStorageSync('suffixHD1HB64'),
            suffixTest: wx.getStorageSync('suffixTest'),
            customSuffix: wx.getStorageSync('customSuffix')
        })
    }, suffix64HBChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HB: e.detail.checked
        })
    }, suffixHB64Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHB64: e.detail.checked
        })
    }, suffix64HB1Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HB1: e.detail.checked
        })
    }, suffixHB164Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHB164: e.detail.checked
        })
    }, suffix64HB2Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HB2: e.detail.checked
        })
    }, suffixHB264Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHB264: e.detail.checked
        })
    }, suffix64HB3Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HB3: e.detail.checked
        })
    }, suffixHB364Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHB364: e.detail.checked
        })
    }, suffix64HDChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HD: e.detail.checked
        })
    }, suffixHD64Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHD64: e.detail.checked
        })
    }, suffix64HD1Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HD1: e.detail.checked
        })
    }, suffixHD164Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHD164: e.detail.checked
        })
    }, suffix64HD2Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HD2: e.detail.checked
        })
    }, suffixHD264Change(e) {
        wx.vibrateShort({
            type: 'light',
        })
        this.setData({
            suffixHD264: e.detail.checked
        })
    }, suffix64HD3Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HD3: e.detail.checked
        })
    }, suffixHD364Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHD364: e.detail.checked
        })
    }, suffix64HD1HBChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffix64HD1HB: e.detail.checked
        })
    }, suffixHD1HB64Change(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixHD1HB64: e.detail.checked
        })
    }, suffixTestChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            suffixTest: e.detail.checked
        })
    }, changeCustomSuffix(e) {
        this.setData({
            customSuffix: e.detail.value
        })
    }, saveSuffixSetting() {
        this.setData({
            suffixSettingVisible: false, settingVisible: true
        });
        wx.setStorageSync('suffix64HB', this.data.suffix64HB);
        wx.setStorageSync('suffixHB64', this.data.suffixHB64);
        wx.setStorageSync('suffix64HB1', this.data.suffix64HB1);
        wx.setStorageSync('suffixHB164', this.data.suffixHB164);
        wx.setStorageSync('suffix64HB2', this.data.suffix64HB2);
        wx.setStorageSync('suffixHB264', this.data.suffixHB264);
        wx.setStorageSync('suffix64HB3', this.data.suffix64HB3);
        wx.setStorageSync('suffixHB364', this.data.suffixHB364);
        wx.setStorageSync('suffix64HD', this.data.suffix64HD);
        wx.setStorageSync('suffixHD64', this.data.suffixHD64);
        wx.setStorageSync('suffix64HD1', this.data.suffix64HD1);
        wx.setStorageSync('suffixHD164', this.data.suffixHD164);
        wx.setStorageSync('suffix64HD2', this.data.suffix64HD2);
        wx.setStorageSync('suffixHD264', this.data.suffixHD264);
        wx.setStorageSync('suffix64HD3', this.data.suffix64HD3);
        wx.setStorageSync('suffixHD364', this.data.suffixHD364);
        wx.setStorageSync('suffix64HD1HB', this.data.suffix64HD1HB);
        wx.setStorageSync('suffixHD1HB64', this.data.suffixHD1HB64);
        wx.setStorageSync('suffixTest', this.data.suffixTest);
        wx.setStorageSync('customSuffix', this.data.customSuffix);
        Message.info({
            context: this,
            offset: [90, 32],
            duration: 3000,
            icon: false,
            single: false,
            content: '已保存',
            align: 'center'
        });
    }, onToTop() {
        this.setData({
            topNum: 0
        })
    },
})