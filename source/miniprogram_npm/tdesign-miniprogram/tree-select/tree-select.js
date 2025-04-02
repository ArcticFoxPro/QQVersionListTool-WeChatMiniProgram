import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"./props";const{prefix:prefix}=config,name=`${prefix}-tree-select`;let TreeSelect=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-left-column`,`${prefix}-class-left-item`,`${prefix}-class-middle-item`,`${prefix}-class-right-column`,`${prefix}-class-right-item`,`${prefix}-class-right-item-label`],this.options={multipleSlots:!0},this.data={prefix:prefix,classPrefix:name,scrollIntoView:null},this.properties=Object.assign(Object.assign({},props),{customValue:{type:null,value:null}}),this.controlledProps=[{key:"value",event:"change"}],this.observers={"value, customValue, options, keys, multiple"(){this.buildTreeOptions()}},this.lifetimes={ready(){this.getScrollIntoView("init")}},this.methods={buildTreeOptions(){const{options:e,value:l,defaultValue:t,customValue:i,multiple:s,keys:n}=this.data,r=[];let o=-1,a={children:e};if(0===e.length)return;for(;a&&a.children;){o+=1;const e=a.children.map((e=>({label:e[(null==n?void 0:n.label)||"label"],value:e[(null==n?void 0:n.value)||"value"],children:e.children}))),t=(null==i?void 0:i[o])||(null==l?void 0:l[o]);if(r.push([...e]),null==t){const[l]=e;a=l}else{const l=e.find((e=>e.value===t));a=null!=l?l:e[0]}}const c=Math.max(0,o);if(s){const e=i||l||t;if(null!=e[c]&&!Array.isArray(e[c]))throw TypeError("应传入数组类型的 value")}this.setData({innerValue:i||(null==r?void 0:r.map(((e,t)=>{const i=t===r.length-1&&s?[e[0].value]:e[0].value;return(null==l?void 0:l[t])||i}))),leafLevel:c,treeOptions:r})},getScrollIntoView(e){const{value:l,customValue:t,scrollIntoView:i}=this.data;if("init"===e){const e=t||l,i=Array.isArray(e)?e.map((e=>Array.isArray(e)?e[0]:e)):[e];this.setData({scrollIntoView:i})}else{if(null===i)return;this.setData({scrollIntoView:null})}},onRootChange(e){const{innerValue:l}=this.data,{value:t}=e.detail;this.getScrollIntoView("none"),l[0]=t,this._trigger("change",{value:l,level:0})},handleTreeClick(e){const{level:l,value:t}=e.currentTarget.dataset,{innerValue:i}=this.data;i[l]=t,this.getScrollIntoView("none"),this._trigger("change",{value:i,level:1})},handleRadioChange(e){const{innerValue:l}=this.data,{value:t}=e.detail,{level:i}=e.target.dataset;l[i]=t,this.getScrollIntoView("none"),this._trigger("change",{value:l,level:i})}}}};TreeSelect=__decorate([wxComponent()],TreeSelect);export default TreeSelect;