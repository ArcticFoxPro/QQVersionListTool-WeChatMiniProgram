import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import{getRect,systemInfo}from"../common/utils";import config from"../common/config";import props from"./props";const{prefix:prefix}=config,name=`${prefix}-navbar`;let Navbar=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-placeholder`,`${prefix}-class-content`,`${prefix}-class-title`,`${prefix}-class-left`,`${prefix}-class-center`,`${prefix}-class-left-icon`,`${prefix}-class-home-icon`,`${prefix}-class-capsule`,`${prefix}-class-nav-btn`],this.timer=null,this.options={multipleSlots:!0},this.properties=props,this.observers={visible(t){const{animation:e}=this.properties,i=`${name}${t?"--visible":"--hide"}`;this.setData({visibleClass:`${i}${e?"-animation":""}`}),this.timer&&clearTimeout(this.timer),e&&(this.timer=setTimeout((()=>{this.setData({visibleClass:i})}),300))},"title,titleMaxLength"(){const{title:t}=this.properties,e=this.properties.titleMaxLength||Number.MAX_SAFE_INTEGER;let i=t.slice(0,e);e<t.length&&(i+="..."),this.setData({showTitle:i})}},this.data={prefix:prefix,classPrefix:name,boxStyle:"",showTitle:"",hideLeft:!1,hideCenter:!1,_menuRect:null,_leftRect:null,_boxStyle:{}},this.methods={initStyle(){this.getMenuRect();const{_menuRect:t,_leftRect:e}=this.data;if(!t||!e||!systemInfo)return;const i={"--td-navbar-padding-top":`${systemInfo.statusBarHeight}px`,"--td-navbar-right":systemInfo.windowWidth-t.left+"px","--td-navbar-left-max-width":`${t.left}px`,"--td-navbar-capsule-height":`${t.height}px`,"--td-navbar-capsule-width":`${t.width}px`,"--td-navbar-height":`${2*(t.top-systemInfo.statusBarHeight)+t.height}px`};this.calcCenterStyle(e,t,i)},calcCenterStyle(t,e,i){const n=Math.max(t.right,systemInfo.windowWidth-e.left),s=Object.assign(Object.assign({},i),{"--td-navbar-center-left":`${n}px`,"--td-navbar-center-width":`${Math.max(e.left-n,0)}px`}),a=Object.entries(s).map((([t,e])=>`${t}: ${e}`)).join("; ");this.setData({boxStyle:a,_boxStyle:s})},getLeftRect(){getRect(this,`.${name}__left`).then((t=>{t.right>this.data._leftRect.right&&this.calcCenterStyle(t,this.data._menuRect,this.data._boxStyle)}))},getMenuRect(){if(wx.getMenuButtonBoundingClientRect){const t=wx.getMenuButtonBoundingClientRect();this.setData({_menuRect:t,_leftRect:{right:systemInfo.windowWidth-t.left}})}},onMenuButtonBoundingClientRectWeightChange(){wx.onMenuButtonBoundingClientRectWeightChange&&wx.onMenuButtonBoundingClientRectWeightChange((t=>this.queryElements(t)))},offMenuButtonBoundingClientRectWeightChange(){wx.offMenuButtonBoundingClientRectWeightChange&&wx.offMenuButtonBoundingClientRectWeightChange((t=>this.queryElements(t)))},queryElements(t){Promise.all([getRect(this,`.${this.data.classPrefix}__left`),getRect(this,`.${this.data.classPrefix}__center`)]).then((([e,i])=>{Math.round(e.right)>t.left?this.setData({hideLeft:!0,hideCenter:!0}):Math.round(i.right)>t.left?this.setData({hideLeft:!1,hideCenter:!0}):this.setData({hideLeft:!1,hideCenter:!1})}))},goBack(){const{delta:t}=this.data,e=this;this.triggerEvent("go-back"),t>0&&wx.navigateBack({delta:t,fail(t){e.triggerEvent("fail",t)},complete(t){e.triggerEvent("complete",t)},success(t){e.triggerEvent("success",t)}})}}}attached(){this.initStyle(),this.getLeftRect(),this.onMenuButtonBoundingClientRectWeightChange()}detached(){this.offMenuButtonBoundingClientRectWeightChange()}};Navbar=__decorate([wxComponent()],Navbar);export default Navbar;