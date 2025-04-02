import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"../message/props";import{getRect,unitConvert,calcIcon}from"../common/utils";import{isObject}from"../common/validator";const{prefix:prefix}=config,name=`${prefix}-message`,SHOW_DURATION=500,THEME_ICON={info:"info-circle-filled",success:"check-circle-filled",warning:"info-circle-filled",error:"error-circle-filled"};let Message=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-content`,`${prefix}-class-icon`,`${prefix}-class-link`,`${prefix}-class-close-btn`],this.options={multipleSlots:!0},this.properties=Object.assign({},props),this.data={prefix:prefix,classPrefix:name,loop:-1,animation:[],showAnimation:[],wrapTop:-999,fadeClass:""},this.closeTimeoutContext=0,this.nextAnimationContext=0,this.resetAnimation=wx.createAnimation({duration:0,timingFunction:"linear"}),this.observers={marquee(t){"{}"!==JSON.stringify(t)&&"true"!==JSON.stringify(t)||this.setData({marquee:{speed:50,loop:-1,delay:0}})},"icon, theme"(t,e){this.setData({_icon:calcIcon(t,THEME_ICON[e])})},link(t){const e=isObject(t)?Object.assign({},t):{content:t};this.setData({_link:e})},closeBtn(t){this.setData({_closeBtn:calcIcon(t,"close")})}},this.lifetimes={ready(){this.memoInitialData()},detached(){this.clearMessageAnimation()}}}memoInitialData(){this.initialData=Object.assign(Object.assign({},this.properties),this.data)}resetData(t){this.setData(Object.assign({},this.initialData),t)}checkAnimation(){const{marquee:t}=this.properties;if(!t||0===t.loop)return;const e=t.speed;if(this.data.loop>0)this.data.loop-=1;else if(0===this.data.loop)return void this.setData({animation:this.resetAnimation.translateX(0).step().export()});this.nextAnimationContext&&this.clearMessageAnimation();const i=`#${name}__text-wrap`,s=`#${name}__text`;Promise.all([getRect(this,s),getRect(this,i)]).then((([t,i])=>{this.setData({animation:this.resetAnimation.translateX(i.width).step().export()},(()=>{const s=(t.width+i.width)/e*1e3,a=wx.createAnimation({duration:s}).translateX(-t.width).step().export();setTimeout((()=>{this.nextAnimationContext=setTimeout(this.checkAnimation.bind(this),s),this.setData({animation:a})}),20)}))}))}clearMessageAnimation(){clearTimeout(this.nextAnimationContext),this.nextAnimationContext=0}show(t=0){const{duration:e,marquee:i,offset:s,id:a}=this.properties;this.setData({visible:!0,loop:i.loop||this.data.loop,fadeClass:`${name}__fade`,wrapTop:unitConvert(s[0])+t}),this.reset(),this.checkAnimation(),e&&e>0&&(this.closeTimeoutContext=setTimeout((()=>{this.hide(),this.triggerEvent("duration-end",{self:this})}),e));getRect(this,a?`#${a}`:`#${name}`).then((t=>{this.setData({height:t.height},(()=>{this.setData({fadeClass:""})}))}))}hide(){this.reset(),this.setData({fadeClass:`${name}__fade`}),setTimeout((()=>{this.setData({visible:!1,animation:[]})}),500),"function"==typeof this.onHide&&this.onHide()}reset(){this.nextAnimationContext&&this.clearMessageAnimation(),clearTimeout(this.closeTimeoutContext),this.closeTimeoutContext=0}handleClose(){this.hide(),this.triggerEvent("close-btn-click")}handleLinkClick(){this.triggerEvent("link-click")}};Message=__decorate([wxComponent()],Message);export default Message;