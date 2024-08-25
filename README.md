# QQ 版本列表 Lite for WeChat MiniProgram

![QQ 版本列表 Lite Banner](https://raw.githubusercontent.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram/main/QQVerLiteBanner.png)

<div align="center">

[注意事项](#注意事项) | [简介](#简介) | [如何获取](#如何获取) | [如何使用](#如何使用) | [常见问题](#常见问题) | [其它](#其它)

[贡献成员](#贡献成员) | [开源相关](#开源相关) | [孪生项目](#孪生项目)

</div> 

<span id="注意事项"></span>

## 注意事项：使用前须知

> [!WARNING]
> 请确保您在使用前充分审慎阅读了[用户协议](https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram/blob/main/UserAgreement.md)。鉴于 QQ 测试版可能存在不可预知的稳定性问题，您在下载及使用该测试版本之前，必须明确并确保自身具备足够的风险识别和承受能力。根据相关条款，您使用本软件时应当已了解并同意，因下载或使用 QQ 测试版而可能产生的任何直接或间接损失、损害以及其他不利后果，均由您自行承担全部责任。

> [!WARNING]
> QQ 版本列表 Lite 提供的所有服务及内容均旨在促进合法的学习交流活动，严禁用户将其用于任何非法、违规或侵犯他人权益的目的。敬请所有用户严格遵守相关法律法规，在使用本应用的过程中秉持合法、正当与诚信原则，切勿涉足任何违法用途。如有违反，相关法律责任将由行为人自负，同时，本应用亦保留采取一切必要措施的权利，包括但不限于暂停或终止服务，并追究其法律责任。

## 简介

QQ 版本列表 Lite for WeChat MiniProgram 是一个使用 TDesign 组件库构建，旨在提供 Android QQ 版本列表查看的微信小程序。QQ 版本列表 Lite 用户可以通过本应用及时获取到 Android QQ 版本更新的最新信息。

## To Do List

- [x] ~适配深色模式（跟随 TDesign 微信小程序组件库上游深色模式适配而更新）~（1.0.1 版本上线，采用 TDesign 微信小程序组件库 1.3.0）
- [ ] 适配微信小程序 Skyline 渲染引擎（跟随 TDesign 微信小程序组件库上游 Skyline 适配而更新）

<span id="如何获取"></span>

## 如何获取？

### 微信小程序开发者

微信小程序开发者可通过以下步骤使用 QQ 版本列表 Lite for WeChat MiniProgram：

1. 为本地电脑配置 Node.js 和 NPM 环境。Node.js 官网：https://nodejs.org/
2. 下载仓库源代码，并解压到本地。
3. [前往微信公众平台注册微信小程序开发者账号](https://mp.weixin.qq.com/cgi-bin/wx)，取得 `AppID`（小程序需配置域名白名单，测试号无法实现这一点）。
4. 在 [微信公众平台](https://mp.weixin.qq.com/)-开发管理-服务器域名 中，将以下域名导入微信小程序 request 合法域名：
  ```
  https://dldir1.qq.com;https://download.z.weixin.qq.com;https://downv6.qq.com;https://im.qq.com;https://static.tdesign.tencent.com;https://tcb-api.tencentcloudapi.com;
  ```
5. 下载[微信小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，登录后点击“小程序”-“导入”，填入上一步取得的 `AppID`，将 `<仓库源代码解压目录>/source` 目录选中后导入。
6. 点击微信小程序开发者工具上方“预览”按钮并使用手机扫码，即可使用 QQ 版本列表 Lite for WeChat MiniProgram。

### 非微信小程序开发者

由于微信公众平台限制，微信小程序个人开发者所拥有的体验版用户名额上限为 15 个，非微信小程序开发者用户无法使用 QQ 版本列表 Lite for WeChat MiniProgram，请谅解。

<span id="如何使用"></span>

## 如何使用？

### 版本列表

在进入 QQ 版本列表 Lite 时，您首先会看到一系列显示“版本：x.y.z 额定大小：xxx MB”的卡片，这些卡片组成的列表即为 Android QQ 的版本列表，卡片列表展示了已经或即将发布的 Android QQ 版本。版本信息来源：https://im.qq.com/rainbow/androidQQVersionList

点击卡片将弹出弹出层，可查阅到更为详尽的信息和原始 JSON 字符串信息。

### 猜版 Extended

在 Android QQ - 首页侧滑菜单 - 设置 - 关于QQ与帮助 中可得知，Android QQ 的版本号通常为 `x.y.z.nnnnn`。其中 `x.y.z` 在这里被称为“主版本号”，而 `nnnnn` 被称为“小版本号”。

在 QQ 版本列表 Lite 界面，点击右下角“猜版 Extd.”按钮即可进入“猜版 Extended for Android”对话框。

对话框含有两个输入框和一个开关，分别是“主版本号”、“小版本号”和“测试版猜版”开关。“主版本号”已经预填入了版本列表显示的最新版本号，也可自行修改。

- 若“测试版猜版”开关为关时开始猜版，无需填写小版本号，软件将尝试访问以下链接：
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_64.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_64_HB.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_64_HB1.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_64_HB2.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_64_HB3.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_64_BBPJ.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_HB_64.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_HB1_64.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_HB2_64.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_HB3_64.apk`
  - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>_BBPJ_64.apk`

- 若“测试版猜版”开关为开时，则需要填写起始小版本号后才可开始猜版。
  - 默认情况下，软件将尝试访问 `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64.apk` ，若当次访问未果，默认情况下将按照设置逻辑自动递增小版本号后再次尝试访问，直到访问成功为止。
  - 在设置中打开扩展测试版猜版格式后，软件将尝试访问以下链接：
    <details>
    <summary>点击展开</summary>

    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HB.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HB1.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HB2.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HB3.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HB_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HB1_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HB2_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HB3_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HD.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HD1.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HD2.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HD3.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HD_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HD1_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HD2_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HD3_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_64_HD1HB.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_HD1HB_64.apk`
    - `https://downv6.qq.com/qqweb/QQ_1/android_apk/Android_<主版本号>.<小版本号>_test.apk`
    </details>

    若当次访问未果，默认情况下将按照设置逻辑自动递增小版本号后再次尝试访问，直到访问成功为止。

> [!TIP]
> QQ 版本列表 Lite 自 1.1.0 版本起实验性支持了 Android 微信和 Android 微信输入法的猜版。
> 
> 若选择微信猜版，对话框将变更为三个输入框，分别是“主版本号”、“真实版本号”和“十六进制代码”，对应的直链为：
>
> `http://dldir1.qq.com/weixin/android/weixin<主版本号>android<真实版本号>_<十六进制代码>_arm64.apk`
>
> 填入相应输入框内容后，小程序将尝试访问上述链接。若当次访问未果，默认情况下将自动递增十六进制代码后再次尝试访问，直到访问成功为止。
> 
> 若选择微信输入法猜版，对话框将变更为两个输入框，分别是“主版本号”和“直链版本号”，对应的直链为：
> 
> `https://download.z.weixin.qq.com/app/android/<主版本号>/wxkb_<直链版本号>_32.apk`
> 
> 填入相应输入框内容后，小程序将尝试访问上述链接。若当次访问未果，默认情况下将自动递增直链版本号后再次尝试访问，直到访问成功为止。
> 
> 访问成功后，软件会弹出成功对话框，对话框下方提供了一系列动作按钮，分别是“仅停止”、“跳过以继续”和“复制并停止”。

> [!WARNING]
> 微信猜版功能和微信输入法猜版功能为 QQ 版本列表 Lite 附带的实验性功能，可能存在不可预知的稳定性问题。请明确并确保自身具备足够的风险识别和承受能力。

## 常见问题

### 为什么 QQ 版本列表 Lite for WeChat MiniProgram 不上架到微信？

QQ 版本列表 Lite for WeChat MiniProgram 仅供学习交流使用，不提供任何形式的服务，也不提供任何形式的技术支持。因此，QQ 版本列表 Lite for WeChat MiniProgram 不会上架到微信。

### 为什么默认添加了小版本号必须为 5 的倍数这项限制？

基于对 Android QQ 长期以来的版本号发布规律进行深入观察和分析的结果，我们发现 Android QQ 小版本号更新通常遵循每增加一个有效版本即递增 5 的倍数这一特定模式。为了贴近这一潜在实际规范并确保 QQ 版本列表 Lite 的快捷性，QQ 版本列表 Lite 依据最佳实践原则，默认设置小版本号和猜版必须为 5 的倍数的限制规则。此限制并非强制，用户可随时进入设置解除此限制。

### 版本列表中已经有新的版本号了，为什么我使用枚举猜版却获取不到下载链接？

即使版本列表已出现了新的版本号，也并不意味着 QQ 团队已经完成了新版本（含测试版）安装包在腾讯公网服务器的部署和发布。一种可能的情况是，QQ 团队正在进行新版本的内部测试阶段或小范围灰度推送阶段，因而尚未对外提供广泛公网下载渠道。

### 为什么不提供 Android 微信的版本列表？

目前还没有找到来自官方的可靠且请求次数少而信息密度大的 Android 微信版本列表数据源，因此 QQ 版本列表 Lite 无法提供 Android 微信的版本列表。如果您发现了可靠的 Android 微信版本列表数据源，欢迎提出 Issue(s) 或提交 PR。

## 其它

> [!IMPORTANT]
> QQ 版本列表 Lite 始终坚守法律底线，秉持尊重与保护所有用户及第三方合法权益的原则。我们深切认识到任何可能存在的权益侵犯行为都会对权益方造成潜在影响，对此，我们表示由衷歉意，并承诺，一旦接到权益方的权益受到侵犯的通知，我们将立即依法启动核查程序，并在确认侵权事实后，迅速采取有效措施，以最大程度地消除不良影响，恢复并保障权益方的合法权益。敬请相关权益方在发现 QQ 版本列表 Lite 存在任何侵权内容时，及时与我们取得联系，我们将竭诚为权益方提供必要的协助与支持。

> [!NOTE]
> “腾讯”“QQ”“腾讯 QQ”“微信”“WeChat”“微信输入法”“WeType”“TDesign”是深圳市腾讯计算机系统有限公司和/或其关联公司的商标。本应用对“腾讯”“QQ”“腾讯 QQ”“微信”“WeChat”“微信输入法”“WeType”“TDesign”的使用旨在注明和指向对应主体，并非表示对“腾讯”“QQ”“腾讯 QQ”“微信”“WeChat”“微信输入法”“WeType”“TDesign”商标的注册和拥有。

> [!NOTE]
> Android™ 是 Google LLC 的商标。

## 贡献成员

<a href="https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ArcticFoxPro/QQVersionListTool-WeChatMiniProgram" />
</a>

## 开源相关

QQ 版本列表 Lite 采用 [木兰公共许可证, 第2版](https://github.com/ArcticFoxPro/QQVersionListTool-WeChatMiniProgram/blob/main/LICENSE) 开源许可。

QQ 版本列表 Lite 的诞生离不开以下开源项目，感谢以下开源项目的作者和贡献者：

- [TDesign WeChat MiniProgram（Tencent）](https://github.com/Tencent/tdesign-miniprogram)，Licensed under [MIT License](https://github.com/Tencent/tdesign-miniprogram/blob/develop/LICENSE)
- [TDesign Icons（Tencent）](https://github.com/Tencent/tdesign-icons)，Licensed under [MIT License](https://github.com/Tencent/tdesign-icons/blob/develop/LICENSE)
- [Node.js®（OpenJS Foundation）](https://nodejs.org/)，Licensed under [MIT License](https://github.com/nodejs/node/blob/main/LICENSE)
- [Semver（npm）](https://github.com/npm/node-semver)，Licensed under [ISC License](https://github.com/npm/node-semver/blob/main/LICENSE)

## 孪生项目

[QQ 版本列表实用工具 for Android](https://github.com/klxiaoniu/QQVersionList)，Licensed under [GNU Affero General Public License Version 3](https://github.com/klxiaoniu/QQVersionList/blob/master/LICENSE)

[![QQ 版本列表实用工具 Banner](https://raw.githubusercontent.com/klxiaoniu/QQVersionList/master/QQVerToolBanner.png)](https://github.com/klxiaoniu/QQVersionList)
