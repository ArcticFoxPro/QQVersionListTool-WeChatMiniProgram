# QQ 版本列表 Lite for WeChat MiniProgram

![QQ 版本列表 Lite Banner](/QQVerLiteBanner.png)

## 注意事项：使用前须知

- 请确保您在使用前充分审慎阅读了[用户协议](/UserAgreement.md)。

- QQ 版本列表 Lite 提供的所有服务及内容均旨在促进合法的学习交流活动，严禁用户将其用于任何非法、违规或侵犯他人权益的目的。敬请所有用户严格遵守相关法律法规，在使用本应用的过程中秉持合法、正当与诚信原则，切勿涉足任何违法用途。如有违反，相关法律责任将由行为人自负，同时，本应用亦保留采取一切必要措施的权利，包括但不限于暂停或终止服务，并追究其法律责任。

## 简介

QQ 版本列表 Lite for WeChat MiniProgram 是一个使用 TDesign 组件库构建，旨在提供 Android QQ 版本列表查看的微信小程序。QQ 版本列表 Lite 用户可以通过本应用及时获取到 Android QQ 版本更新的最新信息。

## To Do List

- [ ] 适配深色模式（跟随 TDesign 组件库上游深色模式适配而更新）
- [ ] 适配微信小程序 Skyline 渲染引擎（跟随 TDesign 组件库上游 Skyline 适配而更新）

## 如何获取？

### 微信小程序开发者

微信小程序开发者可通过以下步骤使用 QQ 版本列表 Lite for WeChat MiniProgram：

1. 为本地电脑配置 Node.js 和 NPM 环境。Node.js 官网：https://nodejs.org/
2. 下载仓库源代码，并解压到本地。
3. [前往微信公众平台注册微信小程序开发者账号](https://mp.weixin.qq.com/cgi-bin/wx)或[申请测试号](https://mp.weixin.qq.com/wxamp/sandbox)，取得 `AppID`。
4. 下载[微信小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，登录后点击“小程序”-“导入”，填入上一步取得的 `AppID`，将 `<仓库源代码解压目录>/source` 目录选中后导入。
5. 点击微信小程序开发者工具上方“预览”按钮并使用手机扫码，即可使用 QQ 版本列表 Lite for WeChat MiniProgram。

### 非微信小程序开发者

由于微信公众平台限制，微信小程序体验版用户上限为 15 个，非微信小程序开发者用户无法使用 QQ 版本列表 Lite for WeChat MiniProgram，请谅解。

## 如何使用？

### 版本列表

在进入 QQ 版本列表 Lite 时，您首先会看到一系列显示“版本：x.y.z 大小：xxx MB”的卡片，这些卡片组成的列表即为 Android QQ 的版本列表，卡片列表展示了已经或即将发布的 Android QQ 版本。版本信息来源：https://im.qq.com/rainbow/androidQQVersionList

点击卡片将弹出弹出层，可查阅到更为详尽的信息和原始 Json 字符串信息。

## 常见问题

### 为什么 QQ 版本列表 Lite for WeChat MiniProgram 无法使用猜版功能？

根据[微信公众平台相关规定](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)：

> 每个微信小程序需要事先设置通讯域名，小程序只可以跟指定的域名进行网络通信。包括普通 HTTPS 请求（`wx.request`）、上传文件（`wx.uploadFile`）、下载文件（`wx.downloadFile`）和 WebSocket 通信（`wx.connectSocket`）。
> 
> - 域名只支持 https（`wx.request、wx.uploadFile、wx.downloadFile`）和 wss（`wx.connectSocket`）协议；
> - 域名不能使用 IP 地址（小程序的局域网 IP 除外）或 `localhost`；
> - 对于 https 域名，可以配置端口，如 `https://myserver.com:8080`，但是配置后只能向 `https://myserver.com:8080` 发起请求。如果向 `https://myserver.com`、`https://myserver.com:9091` 等 URL 请求则会失败。如果不配置端口。如 `https://myserver.com`，那么请求的 URL 中也不能包含端口，甚至是默认的 `443` 端口也不可以。如果向 `https://myserver.com:443` 请求则会失败。
> - 对于 `wss` 域名，无需配置端口，默认允许请求该域名下所有端口。
> - 域名必须经过 ICP 备案；
> - 出于安全考虑，`api.weixin.qq.com` 不能被配置为服务器域名，相关 API 也不能在小程序内调用。 开发者应将 `AppSecret` 保存到后台服务器中，通过服务器使用 `getAccessToken` 接口获取 `access_token`，并调用相关 API；
> - 不支持配置父域名，使用子域名。

由于腾讯的下载服务器使用了将特征码作为二级域名的 CDN 域名，导致为腾讯服务器配置 `wx.request` 白名单变得异常困难，仅靠微信小程序前端代码无法完成猜版功能，因此 QQ 版本列表 Lite for WeChat MiniProgram 无法使用猜版功能，请移步至 [QQ 版本列表实用工具 for Android](https://github.com/klxiaoniu/QQVersionList) 以使用猜版功能。

### 为什么 QQ 版本列表 Lite 不上架到微信？

QQ 版本列表 Lite for WeChat MiniProgram 仅供学习交流使用，不提供任何形式的服务，也不提供任何形式的技术支持。因此，QQ 版本列表 Lite for WeChat MiniProgram 不会上架到微信。

### 版本列表中已经有新的版本号了，为什么我使用 [QQ 版本列表实用工具 for Android](https://github.com/klxiaoniu/QQVersionList) 猜版却获取不到下载链接？

即使版本列表已出现了新的版本号，也并不意味着 QQ 团队已经完成了新版本（含测试版）安装包在腾讯公网服务器的部署和发布。一种可能的情况是，QQ 团队正在进行新版本的内部测试阶段，因而尚未对外提供正式的下载渠道。

## 其他

- QQ 版本列表 Lite 始终坚守法律底线，秉持尊重与保护所有用户及第三方合法权益的原则。我们深切认识到任何可能存在的权益侵犯行为都会对权益方造成潜在影响，对此，我们表示由衷歉意，并承诺，一旦接到权益方的权益受到侵犯的通知，我们将立即依法启动核查程序，并在确认侵权事实后，迅速采取有效措施，以最大程度地消除不良影响，恢复并保障权益方的合法权益。敬请相关权益方在发现 QQ 版本列表 Lite 存在任何侵权内容时，及时与我们取得联系，我们将竭诚为权益方提供必要的协助与支持。

- “QQ”“腾讯 QQ”“腾讯”“微信”“WeChat”是深圳市腾讯计算机系统有限公司和/或其关联公司的商标。本应用对“QQ”“腾讯 QQ”“腾讯”“微信”“WeChat”的使用旨在注明和指向对应主体，并非表示对“QQ”、“腾讯 QQ”、“腾讯”、“微信”、“WeChat”商标的注册和拥有。

- Android™ 是 Google LLC 的商标。

## 贡献成员

<a href="https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ArcticFoxPro/QQVersionListTool-WeChatMiniProgram" />
</a>

## 开源相关

QQ 版本列表 Lite 采用 [木兰公共许可证, 第2版](/LICENSE) 开源许可。

QQ 版本列表 Lite 的诞生离不开以下开源项目，感谢以下开源项目的作者和贡献者：

- [TDesign WeChat MiniProgram（Tencent）](https://github.com/Tencent/tdesign-miniprogram)，Licenced under [MIT License](https://github.com/Tencent/tdesign-miniprogram/blob/develop/LICENSE)
- [Node.js](https://github.com/nodejs/node)，Licenced under [MIT License](https://github.com/nodejs/node/blob/main/LICENSE)

## 孪生项目

[QQ 版本列表实用工具 for Android](https://github.com/klxiaoniu/QQVersionList)，Licenced under [GNU Affero General Public License Version 3](https://github.com/klxiaoniu/QQVersionList/blob/master/LICENSE)

[![QQ 版本列表实用工具 Banner](https://raw.githubusercontent.com/klxiaoniu/QQVersionList/master/QQVerToolBanner.png)](https://github.com/klxiaoniu/QQVersionList)
