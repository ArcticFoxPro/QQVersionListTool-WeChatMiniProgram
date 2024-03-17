// index.js
const QQVersionBean = require('./QQVersionBean.js');

Page({
    options: {
        styleIsolation: 'apply-shared',
    }, data: {
        qqVersions: [], onRefresh: false, refreshIcon: "refresh",
    }, onLoad: function () {
        this.getData();
    }, refreshData: function () {
        this.getData();
    }, copyOSLink() {
        wx.setClipboardData({
            data: 'https://github.com/klxiaoniu/QQVersionList', success(res) {
            }, fail: function (res) {
            }
        })
    }, aboutPopupVisible(e) {
        this.setData({
            aboutVisible: e.detail.visible,
        });
    }, handleAboutPopup(e) {
        const {item} = e.currentTarget.dataset;
        this.setData({
            cur: item,
        }, () => {
            this.setData({aboutVisible: true});
        },);
    }, closeAboutPopup(e) {
        const {item} = e.currentTarget.dataset;
        this.setData({
            cur: item,
        }, () => {
            this.setData({aboutVisible: false});
        },);
    }, getData: function () {
        this.setData({refreshIcon: null,});
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
                        // 假设QQVersionBean的结构与Kotlin中的QQVersionBean一致

                        qqVersionList.push(qqVersionBean);
                    }

                    this.setData({
                        qqVersions: qqVersionList,
                    });
                    this.setData({
                        onRefresh: false,
                    });
                    this.setData({refreshIcon: "refresh",});
                } catch (e) {
                    this.setData({
                        onRefresh: false,
                    });
                    this.setData({refreshIcon: "refresh",});
                    console.error(e);
                    // 在这里处理错误，如显示错误提示对话框等
                }
            }, fail: (err) => {
                this.setData({
                    onRefresh: false,
                });
                this.setData({refreshIcon: "refresh",});
                console.error(err);
                // 在这里处理网络请求失败的情况
            },
        });
    },

})