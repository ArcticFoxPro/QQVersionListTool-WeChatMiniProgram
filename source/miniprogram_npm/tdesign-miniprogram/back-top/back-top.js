import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"./props";import{calcIcon}from"../common/utils";const{prefix:prefix}=config,name=`${prefix}-back-top`;let BackTop=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-icon`,`${prefix}-class-text`],this.options={multipleSlots:!0},this.properties=props,this.relations={"../pull-down-refresh/pull-down-refresh":{type:"ancestor"}},this.data={prefix:prefix,classPrefix:name,_icon:null,hidden:!0},this.observers={icon(){this.setIcon()},scrollTop(o){const{visibilityHeight:t}=this.properties;this.setData({hidden:o<t})}},this.lifetimes={ready(){const{icon:o}=this.properties;this.setIcon(o)}},this.methods={setIcon(o){this.setData({_icon:calcIcon(o,"backtop")})},toTop(){var o;this.triggerEvent("to-top"),this.$parent?(null===(o=this.$parent)||void 0===o||o.setScrollTop(0),this.setData({hidden:!0})):wx.pageScrollTo({scrollTop:0,duration:300})}}}};BackTop=__decorate([wxComponent()],BackTop);export default BackTop;