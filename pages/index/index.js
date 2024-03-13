// index.js
const QQVersionBean = require('./QQVersionBean.js');

Page({
  options: {
    styleIsolation: 'apply-shared',
  },
  data: {
    qqVersions: [],
    aboutBaseBtn: { content: '确定', variant: 'base' },
    dialogKey: '',
    showTooLongBtnContent: false,
  },
  onLoad: function () {
    this.getData();
  },
  refreshData: function(){
    this.getData();
  },
  showDialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },
  closeDialog() {
    const { dialogKey } = this.data;
    this.setData({ [dialogKey]: false });
  },
  getData: function () {
    wx.request({
      url: 'https://im.qq.com/rainbow/androidQQVersionList',
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
            // 假设QQVersionBean的结构与Kotlin中的QQVersionBean一致

            qqVersionList.push(qqVersionBean);
          }

          this.setData({
            qqVersions: qqVersionList,
          });
        } catch (e) {
          console.error(e);
          // 在这里处理错误，如显示错误提示对话框等
        }
      },
      fail: (err) => {
        console.error(err);
        // 在这里处理网络请求失败的情况
      },
    });
  },

})