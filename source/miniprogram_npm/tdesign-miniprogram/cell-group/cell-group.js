import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"./props";const{prefix:prefix}=config,name=`${prefix}-cell-group`;let CellGroup=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-title`],this.relations={"../cell/cell":{type:"child",linked(){this.updateLastChid()},unlinked(){this.updateLastChid()}}},this.properties=props,this.data={prefix:prefix,classPrefix:name},this.methods={updateLastChid(){const e=this.$children;e.forEach(((t,o)=>t.setData({isLastChild:o===e.length-1})))}}}};CellGroup=__decorate([wxComponent()],CellGroup);export default CellGroup;