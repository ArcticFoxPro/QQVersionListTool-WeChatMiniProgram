// index.js

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
import semver from 'semver';
import dayjs from 'dayjs';
import {parse} from 'himalaya'
import JSON5 from "json5";

const util = require('../../utils/util.js');

Page({
    properties: {
        scrollTop: {
            type: Number, value: 0
        },
    }, options: {
        styleIsolation: 'apply-shared',
    }, data: {
        qqVersions: [],
        timVersions: [],
        weixinVersions: [],
        qqOpa: 0,
        timOpa: 0,
        weixinOpa: 0,
        qqScrollNumber: 0,
        timScrollNumber: 0,
        weixinScrollNumber: 0,
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
        timVersionBig: "",
        timVersionSmall: "",
        loadingVisible: false,
        continueGuessing: false,
        successGuessedLink: "",
        guessSuccessVisible: false,
        QQTestSwitch: false,
        suffixSettingVisible: false,
        scrollNumber: 0,
        topNum: 0,
        verListCurrent: 0,
        detailStatus: '',
        expVisible: false,
        getFromTencentAppStoreVisible: false,
        onQQGet: false,
        onTIMGet: false,
        onWeixinGet: false,
        onWeComGet: false,
        onWeTypeGet: false,
        expBackLinks: [],
        expBackJson: "",
        fontHeavySliderMarks: {
            0: 'Light', 1: 'Regular', 2: 'Bold'
        },
        getTimNewestLinkLoading: false,
        safeBottomPadding: 0,
        weixinLocalPlatform: "",
        listOrder: ['QQ 版本列表 Vigor', 'TIM 版本列表 Vigor', '微信版本列表 Vigor'],
        WeixinFirstSwitch: false,
        weixinLatestJSON: {},
        versionListFontFamily: [{label: '跟随系统', value: 'System'}, {
            label: '腾讯云数字字体', value: 'TCloudNumber'
        }, {label: 'WeChat Sans', value: 'WeChatSansSS'}],
        versionListFontWeightSystem: [{label: '跟随系统', value: 'System'}],
        versionListFontWeightTCloudNumber: [{label: 'Light', value: 'Light'}, {
            label: 'Regular', value: 'Regular'
        }, {label: 'Bold', value: 'Bold'}],
        versionListFontWeightWeChatSansSS: [{label: 'Regular', value: 'normal'}, {label: 'Bold', value: 'bold'}]
    }, onLoad: function () {
        const accountInfo = wx.getAccountInfoSync();
        const appBaseInfo = wx.getAppBaseInfo()
        const deviceInfo = wx.getDeviceInfo()

        this.setData({
            theme: wx.getAppBaseInfo().theme || 'light',
            PerProSwitch: wx.getStorageSync('isPerProOn'),
            wechatVersionBig: wx.getStorageSync('weixinVersionBig').replaceAll('.', ''),
            wechatVersionTrue: wx.getStorageSync('wechatVersionTrue'),
            wechatVersion16code: wx.getStorageSync('wechatVersion16code'),
            wetypeVersionBig: wx.getStorageSync('wetypeVersionBig'),
            wetypeVersionLink: wx.getStorageSync('wetypeVersionLink'),
            qqVersionBig: wx.getStorageSync('qqVersionBig'),
            qqVersionSmall: wx.getStorageSync('qqVersionSmall'),
            timVersionBig: wx.getStorageSync('timVersionBig'),
            timVersionSmall: wx.getStorageSync('timVersionSmall'),
            qverbowVersion: getApp().globalData.QVERBOW_VERSION,
            qverbowEnvVersion: accountInfo.miniProgram.envVersion,
            weixinLocalVersion: appBaseInfo.version,
            weixinLocalSDKVersion: appBaseInfo.SDKVersion,
            weixinLocalSystem: deviceInfo.system,
            weixinLocalPlatform: deviceInfo.platform,
            weixinLocalABI: deviceInfo.abi
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

        if (wx.getStorageSync('isUEOn') === false || wx.getStorageSync('isUEOn') === "") this.setData({
            UESwitch: false
        }); else if (wx.getStorageSync('isUEOn') === true) this.setData({
            UESwitch: true
        })

        if (wx.getStorageSync('isKuiklyOn') === false) this.setData({
            KuiklySwitch: false
        }); else this.setData({
            KuiklySwitch: true
        })

        if (wx.getStorageSync('isWeixinFirstOn') === false || wx.getStorageSync('isWeixinFirstOn') === "") this.setData({
            WeixinFirstSwitch: false, listOrder: ['QQ 版本列表 Vigor', 'TIM 版本列表 Vigor', '微信版本列表 Vigor']
        }); else if (wx.getStorageSync('isWeixinFirstOn') === true) this.setData({
            WeixinFirstSwitch: true, listOrder: ['微信版本列表 Vigor', 'QQ 版本列表 Vigor', 'TIM 版本列表 Vigor']
        })

        const versionListFontStyleValue = wx.getStorageSync('versionListFontStyle')
        if (versionListFontStyleValue !== "") this.setData({
            versionListFontStyleValue: JSON5.parse(versionListFontStyleValue)
        }); else this.setData({
            versionListFontStyleValue: ['TCloudNumber', 'Light']
        })

        if (this.data.versionListFontStyleValue[0] === 'System') this.setData({
            versionListFontText: '跟随系统'
        }); else if (this.data.versionListFontStyleValue[0] === 'WeChatSansSS') this.setData({
            versionListFontText: 'WeChat Sans - ' + this.data.versionListFontStyleValue[1]
        }); else if (this.data.versionListFontStyleValue[0] === 'TCloudNumber') this.setData({
            versionListFontText: '腾讯云数字字体 - ' + this.data.versionListFontStyleValue[1]
        })

        function setThrottleSwitch(isThrottleOn, benchmarkLevelConditionMet) {
            if (isThrottleOn === false) this.setData({
                ThrottleSwitch: false
            }); else if (isThrottleOn === true) this.setData({
                ThrottleSwitch: true
            }); else if (isThrottleOn === "" || isThrottleOn === undefined) this.setData({
                ThrottleSwitch: benchmarkLevelConditionMet
            })
        }

        wx.getDeviceBenchmarkInfo({
            success: function (res) {
                setThrottleSwitch.call(this, wx.getStorageSync('isThrottleOn'), res.benchmarkLevel >= 29);
            }.bind(this), fail: function () {
                setThrottleSwitch(this, wx.getStorageSync('isThrottleOn'), false);
            }.bind(this)
        });

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

        wx.loadBuiltInFontFace({
            global: true, family: 'WeChatSansSS', source: 'WeChatSansSS'
        })
    }, onReady: async function () {
        this.setData({
            yearNow: dayjs().year()
        })

        const windowInfo = wx.getWindowInfo();

        const windowHeight = windowInfo.windowHeight
        const safeBottomPadding = windowInfo.screenHeight - windowInfo.safeArea.bottom

        this.setData({
            safeBottomPadding: safeBottomPadding + (32 / 750 * windowInfo.windowWidth),
            safeBottomPaddingBackTop: safeBottomPadding + (160 / 750 * windowInfo.windowWidth)
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
        let elementHeight2 = await getElementHeight('#titleTop2');
        let elementHeight3 = await getElementHeight('#bottomButton');


        this.setData({
            heightRecycle: windowHeight - elementHeight1 - elementHeight3
        });

        this.setData({
            largeTitleTopHeight: elementHeight2
        });

        if (!Number.isInteger(wx.getStorageSync('UAAgreed')) || wx.getStorageSync('UAAgreed') < getApp().globalData.UA_VERSION) {
            this.setData({
                UAVisible: true
            });
        }
        this.getData();
    }, onUnload: function () {
        this.cancelGuess();
    }, refreshData: function () {
        this.getData();
    }, copyOSLink() {
        this.copyUtil('https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram');
    }, getData: function () {
        this.setData({
            refreshIcon: null, onRefresh: true, yearNow: dayjs().year()
        });
        let progressFlag = 0

        function endProgress(that) {
            if (progressFlag === 0) progressFlag = 1; else that.setData({
                onRefresh: false, refreshIcon: "refresh"
            });
        }

        wx.request({
            url: 'https://im.qq.com/rainbow/androidQQVersionList',
            useHighPerformanceMode: true,
            method: 'GET',
            success: (res) => {
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
                        qqVersionBean.jsonString = JSON.parse(json)
                        qqVersionBean.isAccessibility = false // semver.gte(qqVersionBean.versionNumber, getApp().EARLIEST_ACCESSIBILITY_QQ_VERSION)
                        qqVersionBean.isQQNTFramework = semver.gte(qqVersionBean.versionNumber, getApp().globalData.EARLIEST_QQNT_FRAMEWORK_QQ_VERSION_STABLE)
                        qqVersionBean.isUnrealEngine = semver.gte(qqVersionBean.versionNumber, getApp().globalData.EARLIEST_UNREAL_ENGINE_QQ_VERSION_STABLE)
                        qqVersionBean.isKuiklyInside = semver.gte(qqVersionBean.versionNumber, getApp().globalData.EARLIEST_KUIKLY_FRAMEWORK_QQ_VERSION_STABLE)

                        qqVersionList.push(qqVersionBean);
                    }

                    this.setData({
                        qqVersions: qqVersionList, qqVersionBig: qqVersionList[0].versionNumber
                    });
                    wx.setStorageSync('qqVersionBig', qqVersionList[0].versionNumber);
                    let maxSizeInFloat = qqVersionList.map(qv => parseFloat(qv.size)).filter(isFinite).reduce((max, current) => Math.max(max, current), -Infinity);
                    this.setData({
                        maxSize: maxSizeInFloat, versionBig: qqVersionList[0].versionNumber
                    })

                    endProgress(this)
                } catch (e) {
                    endProgress(this)
                    this.showErrPopup(e)
                }
            },
            fail: (err) => {
                endProgress(this)
                this.showErrPopup(err)
            },
        });

        wx.request({
            url: 'https://tim.qq.com/support.html', method: 'GET', useHighPerformanceMode: true, success: (res) => {
                try {
                    const htmlData = res.data;
                    const regex = /jQuery\.ajax\(\{\s*url:\s*'([^']+)'\s*}\)\.done\(function \(versionData\)/;
                    const match = htmlData.match(regex);
                    if (match && match[1] && (match[1].startsWith('https://') || match[1].startsWith('http://'))) {
                        wx.request({
                            // https://im.qq.com/rainbow/TIMDownload/ 被弃用
                            url: match[1].replaceAll('http://', 'https://'),
                            method: 'GET',
                            useHighPerformanceMode: true,
                            success: (res) => {
                                try {
                                    const jsonData = JSON.parse(JSON.stringify(res.data));
                                    const androidLink = jsonData['download_link']['android']
                                    const timVersionList = [];

                                    // 从 `version_history` 项中获取 Android 版本
                                    jsonData['version_history'].forEach(function (versionItem) {
                                        versionItem.logs.forEach(function (logItem) {
                                            if (logItem.platform === "android") {
                                                timVersionList.push({
                                                    version_code: versionItem['version_code'],
                                                    datetime: logItem.datetime,
                                                    fix: logItem.fix,
                                                    feature: logItem.feature,
                                                    isAccessibility: false,
                                                    isQQNTFramework: semver.gte(versionItem['version_code'], getApp().globalData.EARLIEST_QQNT_FRAMEWORK_TIM_VERSION_STABLE),
                                                    isKuiklyInside: semver.gte(versionItem['version_code'], getApp().globalData.EARLIEST_KUIKLY_FRAMEWORK_TIM_VERSION_STABLE),
                                                    jsonString: {
                                                        version_code: versionItem['version_code'],
                                                        datetime: logItem.datetime,
                                                        fix: logItem.fix,
                                                        feature: logItem.feature
                                                    },
                                                    link: ""
                                                });
                                            }
                                        });
                                    });

                                    const uniqueTIMVersionList = [...new Map(timVersionList.map(item => [JSON.stringify(item.jsonString), item])).values()];
                                    uniqueTIMVersionList[0].link = androidLink
                                    const parsedJson = JSON.parse(JSON.stringify(uniqueTIMVersionList[0].jsonString));
                                    uniqueTIMVersionList[0].jsonString = {
                                        version_code: parsedJson.version_code,
                                        datetime: parsedJson.datetime,
                                        fix: parsedJson.fix,
                                        feature: parsedJson.feature,
                                        link: androidLink
                                    };

                                    this.setData({
                                        timVersions: uniqueTIMVersionList
                                    });
                                    wx.setStorageSync('timVersionBig', timVersionList[0].version);

                                    endProgress(this)

                                } catch (e) {
                                    endProgress(this)
                                    this.showErrPopup(e)
                                }
                            },
                            fail: (err) => {
                                endProgress(this)
                                this.showErrPopup(err)
                            },
                        })
                    }
                } catch (e) {
                    endProgress(this)
                    this.showErrPopup(e)
                }
            }, fail: (err) => {
                endProgress(this)
                this.showErrPopup(err)
            }
        });

        wx.request({
            url: 'https://weixin.qq.com/updates', method: 'GET', useHighPerformanceMode: true, success: (res) => {
                try {
                    const responseData = res.data.toString();
                    const json = parse(responseData)
                    let platform = this.data.weixinLocalPlatform
                    if (platform === 'devtools' || platform === 'ohos') platform = 'harmonyos'

                    function findAndroidSection(node) {
                        if (node.tagName === 'section' && node.attributes.some(attr => attr.key === 'id' && attr.value === platform)) return node;
                        if (node.children) for (const child of node.children) {
                            const result = findAndroidSection(child);
                            if (result) return result;
                        }
                        if (Array.isArray(node)) for (const child of node) {
                            const result = findAndroidSection(child);
                            if (result) return result;
                        }
                        return null;
                    }

                    const androidSection = findAndroidSection(json);

                    let weixinVersionList = [];
                    if (androidSection && androidSection.children) {
                        function findVersionItems(nodes) {
                            const versionItems = [];
                            for (const node of nodes) {
                                if (node.tagName === 'li' && node.attributes.some(attr => attr.key === 'class' && attr.value === 'faq_section_sublist_item')) versionItems.push(node);
                                if (node.children) versionItems.push(...findVersionItems(node.children));
                            }
                            return versionItems;
                        }

                        const versionItems = findVersionItems(androidSection.children);
                        versionItems.forEach(item => {
                            const aElement = item.children.find(child => child.tagName === 'a');
                            if (!aElement) return;
                            const versionElement = aElement.children.find(child => child.tagName === 'span' && child.attributes.some(attr => attr.key === 'class' && attr.value === 'version'));
                            const dateElement = aElement.children.find(child => child.tagName === 'span' && !child.attributes.some(attr => attr.key === 'class' && attr.value === 'version'));

                            if (versionElement && dateElement) {
                                const version = versionElement.children[0].content.trim();
                                const publishDate = dateElement.children[0].content.trim().replaceAll('(', '').replaceAll(')', '');
                                weixinVersionList.push({
                                    version, datetime: publishDate, isAlpha: false
                                });
                            }
                        });
                    }

                    this.setData({
                        weixinVersions: weixinVersionList, weixinVersionBig: weixinVersionList[0].version
                    });
                    wx.setStorageSync('weixinVersionBig', weixinVersionList[0].version);

                    endProgress(this)
                } catch (e) {
                    endProgress(this)
                    this.showErrPopup(e)
                }
            }, fail: (err) => {
                endProgress(this)
                this.showErrPopup(err)
            },
        });

        wx.request({
            url: 'https://support.weixin.qq.com/update/',
            method: 'GET',
            useHighPerformanceMode: true,
            success: (res) => {
                try {
                    const responseData = res.data.toString();
                    const startString = "var cgiData= {\"errCode\":0,\"errMsg\":\"ok\",\"data\":";
                    const start = responseData.indexOf(startString) + startString.length;
                    const end = responseData.indexOf(",\"isMobile\":");
                    const jsonData = JSON.parse(responseData.substring(start, end));
                    let platform = this.data.weixinLocalPlatform
                    const getPlatformVersion = (platform) => {
                        switch (platform) {
                            case 'ios':
                                return 'iosVersion';
                            case 'windows':
                                return 'winVersion';
                            case 'mac':
                                return 'macVersion';
                            default:
                                return 'andrVersion';
                        }
                    };
                    const platformVersion = getPlatformVersion(platform);
                    this.setData({
                        weixinLatestJSON: jsonData, weixinLatestVersion: jsonData.prodItems[platformVersion]
                    })
                } catch (e) {
                    endProgress(this)
                    this.showErrPopup(e)
                }
            },
            fail: (err) => {
                this.showErrPopup(err)
            },
        })

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
            detailStatus: 'QQDetail',
            itemVersion: this.data.qqVersions[index].versionNumber,
            itemSize: this.data.qqVersions[index].size,
            itemFeatureTitle: this.data.qqVersions[index].featureTitle,
            itemSummary: this.data.qqVersions[index].summary,
            itemString: JSON.stringify(this.data.qqVersions[index].jsonString, null, 2),
            cellDetailVisible: true
        });
        this.setData({
            preSize: ((parseFloat(this.data.itemSize) / parseFloat(this.data.maxSize)) * 100).toFixed(2)
        }) // 单独 setData，否则传入 0
    }, clickTimCell(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            detailStatus: 'TIMDetail',
            itemTimVersion: this.data.timVersions[index].version_code,
            itemTimDatetime: this.data.timVersions[index].datetime,
            itemTimFix: this.data.timVersions[index].fix,
            itemTimNew: this.data.timVersions[index].feature,
            itemString: JSON.stringify(this.data.timVersions[index].jsonString, null, 2),
            cellDetailVisible: true
        });
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
    }, copyCellJsonDetail() {
        this.copyUtil(this.data.itemString);
    }, cellDetailPopupVisible(e) {
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

        if (this.data.verListCurrent === 0) this.setData({
            qqOpa: opa, qqScrollNumber: e.detail.scrollTop
        }); else if (this.data.verListCurrent === 1) this.setData({
            timOpa: opa, timScrollNumber: e.detail.scrollTop
        }); else if (this.data.verListCurrent === 2) this.setData({
            weixinOpa: opa, weixinScrollNumber: e.detail.scrollTop
        });

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
        wx.setStorageSync('UAAgreed', getApp().globalData.UA_VERSION);
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
    }, handleExpPopup() {
        this.setData({
            expVisible: true
        })
    }, expPopupVisible(e) {
        this.setData({
            expVisible: e.detail.visible,
        })
    }, closeExpPopup() {
        this.setData({
            expVisible: false
        })
    }, handleGetFromTencentAppStore() {
        this.setData({
            expVisible: false, getFromTencentAppStoreVisible: true
        })
    }, getFromTencentAppStorePopupVisible(e) {
        this.setData({
            getFromTencentAppStoreVisible: e.detail.visible
        })
    }, closeGetFromTencentAppStorePopup() {
        this.setData({
            getFromTencentAppStoreVisible: false, expVisible: true
        })
    }, expBackPopupVisible(e) {
        this.setData({
            expBackVisible: e.detail.visible
        })
    }, closeExpBackPopup() {
        this.setData({
            expBackVisible: false
        })
    }, expJsonBackPopupVisible(e) {
        this.setData({
            expJsonBackVisible: e.detail.visible
        })
    }, handlePerProChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isPerProOn', e.detail.value);
        this.setData({
            PerProSwitch: e.detail.value
        })
    }, handleKuiklyChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isKuiklyOn', e.detail.value);
        this.setData({
            KuiklySwitch: e.detail.value
        })
    }, handleUEChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isUEOn', e.detail.value);
        this.setData({
            UESwitch: e.detail.value
        })
    }, handleWeixinFirstChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        wx.setStorageSync('isWeixinFirstOn', e.detail.value);
        this.setData({
            WeixinFirstSwitch: e.detail.value, topNum: 0, qqOpa: 0, timOpa: 0, weixinOpa: 0, titleOpacity: 0
        })
        this.setData({
            listOrder: e.detail.value ? ['微信版本列表 Vigor', 'QQ 版本列表 Vigor', 'TIM 版本列表 Vigor'] : ['QQ 版本列表 Vigor', 'TIM 版本列表 Vigor', '微信版本列表 Vigor'],
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
    }, onInputTIMBig(e) {
        this.setData({
            timVersionBig: e.detail.value
        })
    }, onInputTIMSmall(e) {
        this.setData({
            timVersionSmall: e.detail.value
        })
    }, startWeChatGuess() {
        const wechatVersionBig = this.data.wechatVersionBig;
        const wechatVersionTrue = this.data.wechatVersionTrue;
        const wechatVersion16code = this.data.wechatVersion16code;
        if (wechatVersionBig === '' || wechatVersionTrue === '' || wechatVersion16code === '') this.setData({
            errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
        }); else {
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
        if ((qqVersionBig === '' && (this.data.QQTestSwitch === false || this.data.QQTestSwitch === "")) || ((qqVersionBig === '' || qqVersionSmall === '') && this.data.QQTestSwitch === true)) this.setData({
            errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
        }); else if (qqVersionSmall % 5 !== 0 && this.data.QQTestSwitch === true && this.data.Not5Switch === false) this.setData({
            errorText: '小版本号需填写 5 的倍数。如需解除此限制，请前往设置进行解除。', errorVisible: true
        }); else {
            this.closeGuessPopup();
            if (this.data.QQTestSwitch === true) {
                wx.setStorageSync('qqVersionSmall', qqVersionSmall);
                this.guessUrl(qqVersionBig, qqVersionSmall, '', 'QQTest').then(r => {
                })
            } else if (this.data.QQTestSwitch === false || this.data.QQTestSwitch === "") this.guessUrl(qqVersionBig, '', '', 'QQOfficial').then(r => {
            })
        }
    }, startTIMGuess() {
        const timVersionBig = this.data.timVersionBig;
        const timVersionSmall = this.data.timVersionSmall;
        if (timVersionBig === '' || timVersionSmall === '') this.setData({
            errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
        }); else {
            this.closeGuessPopup();
            wx.setStorageSync('timVersionSmall', timVersionSmall);
            this.guessUrl(timVersionBig, timVersionSmall, '', 'TIM').then(r => {
            })
        }
    }, startWeTypeGuess() {
        const wetypeVersionBig = this.data.wetypeVersionBig;
        const wetypeVersionLink = this.data.wetypeVersionLink;
        if (wetypeVersionBig === '' || wetypeVersionLink === '') this.setData({
            errorText: '存在未填写的参数，请检查内容是否填写完毕', errorVisible: true
        }); else {
            this.closeGuessPopup();
            wx.setStorageSync('wetypeVersionBig', wetypeVersionBig);
            wx.setStorageSync('wetypeVersionLink', wetypeVersionLink);
            this.guessUrl(wetypeVersionBig, wetypeVersionLink, '', 'WeType').then(r => {
            })
        }
    }, async fetchLink(url) {
        return new Promise((resolve, reject) => {
            wx.request({
                url, method: 'HEAD', useHighPerformanceMode: true, success: function (res) {
                    if (res.statusCode >= 200 && res.statusCode < 300 && res.header['Content-Type'].startsWith('application/')) {
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
        const soListPre = ["_64", "_64_HB", "_64_HB1", "_64_HB2", "_64_HB3", "_HB_64", "_HB1_64", "_HB2_64", "_HB3_64", "_64_BBPJ", "_BBPJ_64", "_64_HD", "_64_HD1", "_64_HD2", "_64_HD3", "_HD_64", "_HD1_64", "_HD2_64", "_HD3_64"];
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

        const wxSoListPre = ["", "_1"]
        const wetypeSoListPre = ["", "_32"]
        const wxSoList = wxSoListPre.concat(customSufList).flat(Infinity)
        const wetypeSoList = wetypeSoListPre.concat(customSufList).flat(Infinity)

        const guess = () => {
            switch (this.data.continueGuessing) {
                case 'STATUS_ONGOING':
                    switch (mode) {
                        case 'WeChat':
                            guessedLink = `https://dldir1v6.qq.com/weixin/android/weixin${versionBig}android${versionSuf}_0x${v16codeStr}_arm64${wxSoList[sIndex]}.apk`;
                            break;
                        case 'WeType':
                            guessedLink = `https://download.z.weixin.qq.com/app/android/${versionBig}/wxkb_${vSuf}${wetypeSoList[sIndex]}.apk`;
                            break;
                        case 'QQOfficial':
                            guessedLink = `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_${versionBig}${soList[sIndex]}.apk`;
                            break;
                        case 'QQTest':
                            guessedLink = `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_${versionBig}.${vSuf}${stList[sIndex]}.apk`;
                            break;
                        case 'TIM':
                            guessedLink = `https://downv6.qq.com/qqweb/QQ_1/android_apk/TIM_${versionBig}.${vSuf}${stList[sIndex]}.apk`;
                            break;
                    }

                    this.setData({
                        loadingVisible: true,
                        guessSuccessVisible: false,
                        updateProgressDialogMessage: `正在扫描下载地址：${guessedLink}`
                    })
                    this.fetchLink(guessedLink).then(isSuccess => {
                        if (isSuccess.exists && isSuccess.fileSize !== false) {
                            this.setData({
                                successGuessedLink: guessedLink,
                                guessSuccessVisible: true,
                                successGuessedModeShare: mode === 'WeChat' ? '微信' : mode === 'WeType' ? '微信输入法' : mode === 'TIM' ? 'TIM' : 'QQ',
                                succeedGuessedVersionShare: mode === 'WeChat' ? versionBig + `（${versionSuf}）` : mode === 'WeType' ? versionBig + `（${vSuf}）` : mode === 'QQOfficial' ? versionBig + ` 正式版` : mode === 'TIM' ? versionBig + '.' + vSuf : versionBig + '.' + vSuf + ' 测试版',
                                succeedGuessedFileSizeShare: `（大小：${isSuccess.fileSize} MB）`,
                                successGuessedWarningShare: mode === 'QQTest' ? '鉴于 QQ 测试版可能存在不可预知的稳定性问题，您在下载及使用该测试版本之前，必须明确并确保自身具备足够的风险识别和承受能力。' : false
                            });
                            switch (mode) {
                                case 'WeChat':
                                    if (sIndex >= wxSoList.length - 1 && this.data.ExtendSuffixSwitch === true) {
                                        v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16);
                                        sIndex = 0;
                                    } else if (sIndex >= wxSoListPre.length - 1 && this.data.ExtendSuffixSwitch === false) {
                                        v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16);
                                        sIndex = 0;
                                    } else sIndex++;
                                    break;
                                case 'WeType':
                                    if (sIndex >= wetypeSoList.length - 1 && this.data.ExtendSuffixSwitch === true) {
                                        vSuf = (Number(vSuf) + 1).toString();
                                        sIndex = 0;
                                    } else if (sIndex >= wetypeSoListPre.length - 1 && this.data.ExtendSuffixSwitch === false) {
                                        vSuf = (Number(vSuf) + 1).toString();
                                        sIndex = 0;
                                    } else sIndex++;
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
                                case 'TIM':
                                    if (sIndex >= stList.length - 1 || this.data.ExtendSuffixSwitch === false) {
                                        vSuf = (Number(vSuf) + 1).toString()
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
                                    if (sIndex >= wxSoList.length - 1 && this.data.ExtendSuffixSwitch === true) {
                                        v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16);
                                        sIndex = 0;
                                    } else if (sIndex >= wxSoListPre.length - 1 && this.data.ExtendSuffixSwitch === false) {
                                        v16codeStr = (parseInt(v16codeStr, 16) + 1).toString(16);
                                        sIndex = 0;
                                    } else sIndex++;
                                    break;
                                case 'WeType':
                                    if (sIndex >= wetypeSoList.length - 1 && this.data.ExtendSuffixSwitch === true) {
                                        vSuf = (Number(vSuf) + 1).toString();
                                        sIndex = 0;
                                    } else if (sIndex >= wetypeSoListPre.length - 1 && this.data.ExtendSuffixSwitch === false) {
                                        vSuf = (Number(vSuf) + 1).toString();
                                        sIndex = 0;
                                    } else sIndex++;
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
                                case 'TIM':
                                    if (sIndex >= stList.length - 1 || this.data.ExtendSuffixSwitch === false) {
                                        vSuf = (Number(vSuf) + 1).toString()
                                        sIndex = 0;
                                    } else sIndex++;
                                    break;
                            }
                            timerId = setTimeout(guess, 100);
                        }
                    }).catch(err => {
                        this.showErrPopup(err)
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
                        content: '已停止扫描',
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
    }, suffixPersonalizationPopupVisible(e) {
        this.setData({
            suffixPersonalizationVisible: e.detail.visible,
        });
    }, handlePersonalizationSetting() {
        this.setData({
            suffixPersonalizationVisible: true, settingVisible: false
        })
    }, closePersonalizationSetting() {
        this.setData({
            suffixPersonalizationVisible: false, settingVisible: true
        })
    }, handleTCloudNumberChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            TCloudNumberSwitch: e.detail.value
        })
        wx.setStorageSync('TCloudNumberSwitch', this.data.TCloudNumberSwitch)
    }, handleTCloudNumberHeavyChange(e) {
        wx.vibrateShort({
            type: 'light',
        });
        this.setData({
            TCloudNumberHeavy: e.detail.value
        })
        wx.setStorageSync('TCloudNumberHeavy', this.data.TCloudNumberHeavy)
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
            topNum: 0, qqOpa: 0, timOpa: 0, weixinOpa: 0
        })
    }, swiperChange(e) {
        if (e.detail.source === "touch") this.setData({
            verListCurrent: e.detail.current,
            titleOpacity: e.detail.current === 0 ? this.data.qqOpa : (e.detail.current === 1 ? this.data.timOpa : this.data.weixinOpa),
            scrollNumber: e.detail.current === 0 ? this.data.qqScrollNumber : (e.detail.current === 1 ? this.data.timScrollNumber : this.data.weixinScrollNumber),
        })
    }, async fetchDownloadLinkFromTencentAppStore(jsonData) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: 'https://upage.html5.qq.com/wechat-apkinfo',
                method: 'POST',
                useHighPerformanceMode: true,
                data: jsonData,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err);
                }
            });
        })
    }, async getDownloadLinkFromTencentAppStore(packageName, type) {
        const jsonData = {
            "packagename": packageName
        }
        switch (type) {
            case 'QQ':
                this.setData({
                    onQQGet: true
                });
                break;
            case 'TIM':
                this.setData({
                    onTIMGet: true
                });
                break;
            case 'Weixin':
                this.setData({
                    onWeixinGet: true
                });
                break;
            case 'WeCom':
                this.setData({
                    onWeComGet: true
                });
                break;
            case 'WeType':
                this.setData({
                    onWeTypeGet: true
                });
                break;
            case 'Qidian':
                this.setData({
                    onQidianGet: true
                });
                break;
        }
        try {
            const allData = await this.fetchDownloadLinkFromTencentAppStore(jsonData);
            const appAllData = allData["app_detail_records"][packageName]["apk_all_data"]
            const appName = appAllData["name"]
            const appVersionName = appAllData["version_name"]
            const appUrl = appAllData["url"]
            const appSize = (parseInt(appAllData["size_byte"]) / (1024 * 1024)).toFixed(2)
            const allDataJson = JSON.stringify(allData, null, 2)
            this.setData({
                successExpBackLink: appUrl,
                expBackVisible: true,
                expBackJson: allDataJson,
                expJsonBackTitle: "腾讯应用宝返回内容",
                expJsonBackResultTitle: "获取成功",
                succeedExpBackFileSizeShare: `（大小：${appSize} MB）`,
                expBackStatus: "success"
            });
            this.setData({
                expShareText: `Android ${appName} ${appVersionName}${this.data.succeedExpBackFileSizeShare}\n\n下载地址：${appUrl}\n\n来自腾讯应用宝`
            })
        } catch (err) {
            this.showErrPopup(err)
        } finally {
            switch (type) {
                case 'QQ':
                    this.setData({
                        onQQGet: false
                    });
                    break;
                case 'TIM':
                    this.setData({
                        onTIMGet: false
                    });
                    break;
                case 'Weixin':
                    this.setData({
                        onWeixinGet: false
                    });
                    break;
                case 'WeCom':
                    this.setData({
                        onWeComGet: false
                    });
                    break;
                case 'WeType':
                    this.setData({
                        onWeTypeGet: false
                    });
                    break;
                case 'Qidian':
                    this.setData({
                        onQidianGet: false
                    });
                    break;
            }
            this.setData({
                getFromTencentAppStoreVisible: false, expJsonBackVisible: false, expVisible: false
            })
        }
    }, async getQQLinkFromTencentAppStore() {
        const data = "com.tencent.mobileqq"
        await this.getDownloadLinkFromTencentAppStore(data, 'QQ')
    }, async getTIMLinkFromTencentAppStore() {
        const data = "com.tencent.tim"
        await this.getDownloadLinkFromTencentAppStore(data, 'TIM')
    }, async getWeixinLinkFromTencentAppStore() {
        const data = "com.tencent.mm"
        await this.getDownloadLinkFromTencentAppStore(data, 'Weixin')
    }, async getWeComLinkFromTencentAppStore() {
        const data = "com.tencent.wework"
        await this.getDownloadLinkFromTencentAppStore(data, 'WeCom')
    }, async getWeTypeLinkFromTencentAppStore() {
        const data = "com.tencent.wetype"
        await this.getDownloadLinkFromTencentAppStore(data, 'WeType')
    }, async getQidianLinkFromTencentAppStore() {
        const data = "com.tencent.qidian"
        await this.getDownloadLinkFromTencentAppStore(data, 'Qidian')
    }, copyExpBack() {
        this.copyUtil(this.data.successExpBackLink)
    }, handleExpJsonBack() {
        this.setData({
            expBackVisible: false, expJsonBackVisible: true, getFromTencentAppStoreVisible: false, expVisible: false
        });
    }, closeExpJsonBackPopup() {
        this.setData({
            expJsonBackVisible: false, expBackVisible: true, getFromTencentAppStoreVisible: false, expVisible: false
        });
    }, copyExpJsonBack() {
        this.copyUtil(this.data.expBackJson)
    }, handleGetFromWeixinAlphaConfig() {
        this.setData({
            getFromWeixinAlphaConfigLoading: true
        })
        wx.request({
            url: 'https://dldir1v6.qq.com/weixin/android/weixin_android_alpha_config.json',
            method: 'GET',
            useHighPerformanceMode: true,
            success: (res) => {
                try {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        let responseData = res.data;
                        let start = responseData.indexOf("cb(") + 3;
                        let end = responseData.indexOf(")");
                        let totalJson = responseData.substring(start, end);
                        let map = util.resolveWeixinAlphaConfig(totalJson)
                        let mapJson = JSON.stringify(map, null, 2)

                        this.fetchLink(map.url.replaceAll("http://", "https://")).then(isSuccess => {
                            if (isSuccess.exists && isSuccess.fileSize !== false) {
                                this.setData({
                                    successExpBackLink: map.url,
                                    succeedExpBackFileSizeShare: `（大小：${isSuccess.fileSize} MB）`,
                                    expVisible: false,
                                    expBackVisible: true,
                                    expBackJson: mapJson,
                                    expJsonBackTitle: "腾讯服务器微信测试版拉取结果",
                                    expJsonBackResultTitle: "获取成功",
                                    expBackStatus: "success"
                                });
                                this.setData({
                                    expShareText: `Android 微信 ${map.versionName} 测试版${this.data.succeedExpBackFileSizeShare}\n\n下载地址：${this.data.successExpBackLink}\n\n鉴于微信测试版可能存在不可预知的稳定性问题，您在下载及使用该测试版本之前，必须明确并确保自身具备足够的风险识别和承受能力。`
                                })
                            } else {
                                this.setData({
                                    successExpBackLink: map.url,
                                    succeedExpBackFileSizeShare: "（似乎未成功访问此下载地址，可能是微信当前测试版已撤包。）",
                                    expVisible: false,
                                    expBackVisible: true,
                                    expBackJson: mapJson,
                                    expJsonBackTitle: "腾讯服务器微信测试版拉取结果",
                                    expJsonBackResultTitle: "疑似撤包",
                                    expBackStatus: "default"
                                });
                                this.setData({
                                    expShareText: `Android 微信 ${map.versionName} 测试版\n\n下载地址：${this.data.successExpBackLink}\n\n鉴于微信测试版可能存在不可预知的稳定性问题，您在下载及使用该测试版本之前，必须明确并确保自身具备足够的风险识别和承受能力。`
                                })
                            }
                        }).catch(err => {
                            this.showErrPopup(err)
                        });
                    } else this.setData({
                        errorText: "似乎未成功访问腾讯服务器配置文件，可能是微信当前没有测试版或测试版已撤包。",
                        errorVisible: true
                    });
                } catch (e) {
                    this.showErrPopup(e)
                }
            },
            fail: (err) => {
                this.showErrPopup(err)
            },
            complete: () => {
                this.setData({
                    getFromWeixinAlphaConfigLoading: false
                })
            }
        });
    }, copyExpBackShare() {
        this.copyUtil(this.data.expShareText)
    }, handleGetFromWeTypeLatestChannel() {
        this.setData({
            getFromWeTypeLatestChannelLoading: true
        })
        wx.request({
            url: `https://z.weixin.qq.com/android/download?channel=latest`,
            method: 'GET',
            redirect: 'manual',
            fail: (err) => {
                this.showErrPopup(err)
            },
            complete: () => {
                this.setData({
                    getFromWeTypeLatestChannelLoading: false
                })
            }
        }).onHeadersReceived(res => {
            const url = res.header.Location;
            this.fetchLink(url).then(isSuccess => {
                if (isSuccess.exists && isSuccess.fileSize !== false) this.setData({
                    successExpBackLink: url,
                    succeedExpBackFileSizeShare: `（大小：${isSuccess.fileSize} MB）`,
                    expVisible: false,
                    expBackWithUrlOnlyVisible: true,
                    expJsonBackTitle: "微信输入法测试通道获取结果",
                    expJsonBackResultTitle: "获取成功",
                    expBackStatus: "success",
                    getFromWeTypeLatestChannelLoading: false,
                    expShareText: ""
                }); else this.setData({
                    successExpBackLink: url,
                    succeedExpBackFileSizeShare: "（似乎未成功访问此下载地址，可能是微信输入法当前测试版已撤包。）",
                    expVisible: false,
                    expBackWithUrlOnlyVisible: true,
                    expJsonBackTitle: "微信输入法测试通道获取结果",
                    expJsonBackResultTitle: "疑似撤包",
                    expBackStatus: "default",
                    getFromWeTypeLatestChannelLoading: false,
                    expShareText: ""
                });
            }).catch(err => {
                this.showErrPopup(err)
                this.setData({
                    getFromWeTypeLatestChannelLoading: false
                });
            });
        })
    }, closeExpBackPopupWithUrlOnly() {
        this.setData({
            expJsonBackVisible: false,
            expBackVisible: false,
            getFromTencentAppStoreVisible: false,
            expVisible: false,
            expBackWithUrlOnlyVisible: false
        });
    }, expBackPopupWithUrlOnlyVisible(e) {
        this.setData({
            expBackWithUrlOnlyVisible: e.detail.visible
        })
    }, getTimNewestLink() {
        const url = this.data.timVersions[0].link
        this.setData({
            getTimNewestLinkLoading: true
        });
        this.fetchLink(url).then(isSuccess => {
            if (isSuccess.exists && isSuccess.fileSize !== false) {
                this.setData({
                    successExpBackLink: url,
                    succeedExpBackFileSizeShare: `（大小：${isSuccess.fileSize} MB）`,
                    expVisible: false,
                    expBackWithUrlOnlyVisible: true,
                    expJsonBackTitle: `TIM ${this.data.timVersions[0].version_code} 正式版`,
                    expJsonBackResultTitle: "获取成功",
                    expBackStatus: "success",
                    getTimNewestLinkLoading: false
                });
                this.setData({
                    expShareText: `Android TIM ${this.data.timVersions[0].version_code} 正式版${this.data.succeedExpBackFileSizeShare}\n\n下载地址：${url}`
                })
            } else {
                this.setData({
                    successExpBackLink: url,
                    succeedExpBackFileSizeShare: "",
                    expVisible: false,
                    expBackWithUrlOnlyVisible: true,
                    expJsonBackTitle: `TIM ${this.data.timVersions[0].version_code} 正式版`,
                    expJsonBackResultTitle: "获取成功",
                    expBackStatus: "success",
                    getTimNewestLinkLoading: false
                });
                this.setData({
                    expShareText: `Android TIM ${this.data.timVersions[0].version_code} 正式版\n\n下载地址：${url}`
                })
            }
        }).catch(err => {
            this.showErrPopup(err)
            this.setData({
                getTimNewestLinkLoading: false
            });
        });
    }, clickWeixinCell(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            detailStatus: 'WeixinDetail',
            itemWeixinVersion: this.data.weixinVersions[index].version,
            itemWeixinDatetime: this.data.weixinVersions[index].datetime,
            cellDetailVisible: true
        });
    }, copyWeixinChangelog() {
        let platform = this.data.weixinLocalPlatform
        if (platform === 'devtools' || platform === 'ohos') platform = 'harmonyos'
        this.copyUtil(`https://weixin.qq.com/updates?platform=${platform}&version=${this.data.itemWeixinVersion}`)
    }, startOssLicensesMenu() {
        wx.navigateTo({
            url: '/pages/oss-licenses-menu/oss-licenses-menu'
        })
    }, localWeixinDetailPopupVisible(e) {
        this.setData({
            localWeixinDetailVisible: e.detail.visible
        })
    }, clickLocalWeixin() {
        this.setData({
            localWeixinDetailVisible: true
        })
    }, closeLocalWeixinDetailPopup() {
        this.setData({
            localWeixinDetailVisible: false
        })
    }, copyLocalWeixin() {
        this.copyUtil(`微信版本：${this.data.weixinLocalVersion}\n微信小程序基础库版本：${this.data.weixinLocalSDKVersion}\n微信客户端平台：${this.data.weixinLocalPlatform}（${this.data.weixinLocalSystem}）` + (this.data.weixinLocalABI !== undefined ? `\nABI：${this.data.weixinLocalABI}` : ''))
    }, clickLocalWeixinVersionCell() {
        this.copyUtil(`微信版本：${this.data.weixinLocalVersion}`)
    }, clickLocalWeixinSDKVersionCell() {
        this.copyUtil(`微信小程序基础库版本：${this.data.weixinLocalSDKVersion}`)
    }, clickLocalWeixinPlatformCell() {
        this.copyUtil(`微信客户端平台：${this.data.weixinLocalPlatform}（${this.data.weixinLocalSystem}）`)
    }, clickLocalWeixinABICell() {
        this.copyUtil(`ABI：${this.data.weixinLocalABI}`)
    }, updateWeixin() {
        wx.updateWeChatApp()
    }, showErrPopup(err) {
        console.error(err);
        const errorMessage = JSON.stringify(err);
        this.setData({
            errorText: errorMessage, errorVisible: true
        });
    }, onVersionListFontPicker() {
        if (this.data.versionListFontStyleValue[0] === 'System' && this.data.versionListFontWeight !== this.data.versionListFontWeightSystem) this.setData({
            versionListFontWeight: this.data.versionListFontWeightSystem
        }); else if (this.data.versionListFontStyleValue[0] === 'WeChatSansSS' && this.data.versionListFontWeight !== this.data.versionListFontWeightWeChatSansSS) this.setData({
            versionListFontWeight: this.data.versionListFontWeightWeChatSansSS
        }); else if (this.data.versionListFontStyleValue[0] === 'TCloudNumber' && this.data.versionListFontWeight !== this.data.versionListFontWeightTCloudNumber) this.setData({
            versionListFontWeight: this.data.versionListFontWeightTCloudNumber
        });
        this.setData({
            versionListFontStylePickerVisible: true
        })
    }, onVersionListFontStyleColumnChange(e) {
        if (e.detail.value[0] === 'System' && this.data.versionListFontWeight !== this.data.versionListFontWeightSystem) this.setData({
            versionListFontWeight: this.data.versionListFontWeightSystem
        }); else if (e.detail.value[0] === 'WeChatSansSS' && this.data.versionListFontWeight !== this.data.versionListFontWeightWeChatSansSS) this.setData({
            versionListFontWeight: this.data.versionListFontWeightWeChatSansSS
        }); else if (e.detail.value[0] === 'TCloudNumber' && this.data.versionListFontWeight !== this.data.versionListFontWeightTCloudNumber) this.setData({
            versionListFontWeight: this.data.versionListFontWeightTCloudNumber
        });
    }, onVersionListFontStylePickerCancel() {
        this.setData({
            versionListFontStylePickerVisible: false
        })
    }, onVersionListFontStylePickerChange(e) {
        this.setData({
            versionListFontStyleValue: e.detail.value, versionListFontStylePickerVisible: false
        })
        if (e.detail.value[0] === 'System') this.setData({
            versionListFontText: '跟随系统'
        }); else if (e.detail.value[0] === 'WeChatSansSS') this.setData({
            versionListFontText: 'WeChat Sans - ' + e.detail.value[1]
        }); else if (e.detail.value[0] === 'TCloudNumber') this.setData({
            versionListFontText: '腾讯云数字字体 - ' + e.detail.value[1]
        })
        wx.setStorageSync("versionListFontStyle", JSON5.stringify(e.detail.value))
    }
})