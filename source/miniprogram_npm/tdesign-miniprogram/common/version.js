import{getAppBaseInfo}from"./wechat";let systemInfo;function getSystemInfo(){return null==systemInfo&&(systemInfo=getAppBaseInfo()),systemInfo}export function compareVersion(e,n){e=e.split("."),n=n.split(".");const t=Math.max(e.length,n.length);for(;e.length<t;)e.push("0");for(;n.length<t;)n.push("0");for(let r=0;r<t;r++){const t=parseInt(e[r]),o=parseInt(n[r]);if(t>o)return 1;if(t<o)return-1}return 0}function judgeByVersion(e){return compareVersion(getSystemInfo().SDKVersion,e)>=0}export function canIUseFormFieldButton(){return judgeByVersion("2.10.3")}export function canUseVirtualHost(){return judgeByVersion("2.19.2")}export function canUseProxyScrollView(){return judgeByVersion("2.19.2")}