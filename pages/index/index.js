// index.js
const QQVersionBean = require('./QQVersionBean.js');

Page({
    options: {
        styleIsolation: 'apply-shared',
    }, data: {
        qqVersions: [], onRefresh: false, refreshIcon: "refresh", versionSmallVisible: wx.getStorage({
            key: "versionSelect", success(res) {
                console.log(res.data)
            }
        }), seeJson: "查看 Json 字符串", titleTop: "", heightRecycle: 5000,
    }, onLoad: function () {
        this.getData();
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
                        console.log('未找到对应的元素：', selector);
                        resolve(0); // 如果找不到元素，返回默认值0
                    }
                });
            });
        };

        // 获取各个元素高度
        elementHeight1 = await getElementHeight('#titleTop1');
        elementHeight2 = await getElementHeight('#titleTop2');
        elementHeight3 = await getElementHeight('#bottomButton');

        console.log('窗口高度：', windowHeight);
        console.log('元素高度1：', elementHeight1);
        console.log('元素高度2：', elementHeight2);
        console.log('元素高度3：', elementHeight3);

        this.setData({heightRecycle: windowHeight - elementHeight1 - elementHeight2 - elementHeight3});
    },

    refreshData: function () {
        this.getData();
    }, copyOSLink() {
        wx.setClipboardData({
            data: 'https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram', success(res) {
            }, fail: function (res) {
            }
        })
    }, getData: function () {
        this.setData({refreshIcon: null,});
        this.setData({onRefresh: true,});
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
                        qqVersions: qqVersionList,
                    });
                    this.setData({onRefresh: false,});
                    this.setData({refreshIcon: "refresh",});

                    this.setData({versionBig: qqVersionList[0].versionNumber})
                } catch (e) {
                    this.setData({onRefresh: false,});
                    this.setData({refreshIcon: "refresh",});
                    console.error(e);
                    // 在这里处理错误，如显示错误提示对话框等
                }
            }, fail: (err) => {
                this.setData({onRefresh: false,});
                this.setData({refreshIcon: "refresh",});
                console.error(err);
                // 在这里处理网络请求失败的情况
            },
        });
    }, aboutPopupVisible(e) {
        this.setData({
            aboutVisible: e.detail.visible,
        });
    }, handleAboutPopup() {
        this.setData({aboutVisible: true});
    }, closeAboutPopup() {
        this.setData({aboutVisible: false});
    }, guessPopupVisible(e) {
        this.setData({
            guessVisible: e.detail.visible,
        });
    }, handleGuessPopup() {
        this.setData({guessVisible: true});
    }, closeGuessPopup() {
        this.setData({guessVisible: false});
    }, copyAndroidOSLink() {
        this.setData({guessVisible: false});
        wx.setClipboardData({
            data: 'https://github.com/klxiaoniu/QQVersionList', success(res) {
            }, fail: function (res) {
            }
        })
    }, clickCell(e) {
        //console.log(e.currentTarget.dataset.index);
        const index = e.currentTarget.dataset.index;
        //this.setData({selectCell:index})
        this.setData({itemVersion: this.data.qqVersions[index].versionNumber});
        this.setData({itemSize: this.data.qqVersions[index].size});
        this.setData({itemFeatureTitle: this.data.qqVersions[index].featureTitle});
        //console.log(this.data.qqVersions[index].summary);
        this.setData({itemSummary: this.data.qqVersions[index].summary});
        this.setData({itemString: JSON.stringify(this.data.qqVersions[index], null, 2)});
        this.setData({cellDetailVisible: true});


    }, closeCellDetailPopup() {
        this.setData({cellDetailVisible: false});
    }, displayJson() {
        this.setData({cellDetailVisible: false});

        this.setData({cellJsonDetailVisible: true});
    }, closeCellJsonDetailPopup() {
        this.setData({cellJsonDetailVisible: false});
    }, cellDetialPopupVisible(e) {
        this.setData({
            cellDetailVisible: e.detail.visible,
        });
    }, cellJsonDetialPopupVisible(e) {
        this.setData({
            cellJsonDetailVisible: e.detail.visible,
        });
    }, titleChange(e) {
        console.log(e.detail.scrollTop)
        if (e.detail.scrollTop >= 50) {
            this.setData({titleTop: "QQ 版本列表 Lite"});
            console.log("Yes")
        } else {
            this.setData({titleTop: ""});
        }
    }

})