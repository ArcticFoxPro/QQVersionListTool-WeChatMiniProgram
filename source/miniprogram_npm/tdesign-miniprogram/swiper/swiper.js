import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"./props";const{prefix:prefix}=config,name=`${prefix}-swiper`;let Swiper=class extends SuperComponent{constructor(){super(...arguments),this.externalClasses=[`${prefix}-class`,`${prefix}-class-nav`,`${prefix}-class-image`,`${prefix}-class-prev-image`,`${prefix}-class-next-image`],this.options={multipleSlots:!0},this.properties=props,this.observers={navCurrent(t){this.updateNav(t)}},this.$nav=null,this.relations={"../swiper-nav/swiper-nav":{type:"child"}},this.data={prefix:prefix,classPrefix:name},this.lifetimes={ready(){const{current:t}=this.properties;this.setData({navCurrent:t})}},this.methods={updateNav(t){var e;if(this.data.navigation)return;const i=null===(e=this.getRelationNodes("./swiper-nav"))||void 0===e?void 0:e[0];if(!i)return;const{direction:r,paginationPosition:n,list:s}=this.properties;i.setData({current:t,total:s.length,direction:r,paginationPosition:n})},onTap(t){const{index:e}=t.currentTarget.dataset;this.triggerEvent("click",{index:e})},onChange(t){const{current:e,source:i}=t.detail;this.setData({navCurrent:e}),this.triggerEvent("change",{current:e,source:i})},onNavBtnChange(t){const{dir:e,source:i}=t.detail;this.doNavBtnChange(e,i)},doNavBtnChange(t,e){const{current:i,list:r,loop:n}=this.data,s=r.length;let o="next"===t?i+1:i-1;o=n?"next"===t?(i+1)%s:(i-1+s)%s:o<0||o>=s?i:o,o!==i&&(this.setData({current:o}),this.triggerEvent("change",{current:o,source:e}))},onImageLoad(t){this.triggerEvent("image-load",{index:t.target.dataset.custom})}}}};Swiper=__decorate([wxComponent()],Swiper);export default Swiper;