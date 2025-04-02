import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"./props";import transition from"../mixins/transition";import useCustomNavbar from"../mixins/using-custom-navbar";delete props.visible;const{prefix:prefix}=config,name=`${prefix}-popup`;let Popup=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-content`],this.behaviors=[transition(),useCustomNavbar],this.options={multipleSlots:!0},this.properties=props,this.data={prefix:prefix,classPrefix:name},this.methods={handleOverlayClick(){const{closeOnOverlayClick:e}=this.properties;e&&this.triggerEvent("visible-change",{visible:!1,trigger:"overlay"})},handleClose(){this.triggerEvent("visible-change",{visible:!1,trigger:"close-btn"})}}}};Popup=__decorate([wxComponent()],Popup);export default Popup;