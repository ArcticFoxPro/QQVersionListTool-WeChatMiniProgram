import{__rest}from"tslib";import props from"./props";import{getInstance}from"../common/utils";const defaultOptions={actions:[],buttonLayout:props.buttonLayout.value,cancelBtn:props.cancelBtn.value,closeOnOverlayClick:props.closeOnOverlayClick.value,confirmBtn:props.confirmBtn.value,content:"",preventScrollThrough:props.preventScrollThrough.value,showOverlay:props.showOverlay.value,title:"",visible:props.visible.value};export default{alert(t){const e=Object.assign(Object.assign({},defaultOptions),t),{context:o,selector:s="#t-dialog"}=e,n=__rest(e,["context","selector"]),c=getInstance(o,s);return c?new Promise((t=>{c.setData(Object.assign(Object.assign({cancelBtn:""},n),{visible:!0})),c._onConfirm=t})):Promise.reject()},confirm(t){const e=Object.assign(Object.assign({},defaultOptions),t),{context:o,selector:s="#t-dialog"}=e,n=__rest(e,["context","selector"]),c=getInstance(o,s);return c?new Promise(((t,e)=>{c.setData(Object.assign(Object.assign({},n),{visible:!0})),c._onConfirm=t,c._onCancel=e})):Promise.reject()},close(t){const{context:e,selector:o="#t-dialog"}=Object.assign({},t),s=getInstance(e,o);return s?(s.close(),Promise.resolve()):Promise.reject()},action(t){const e=Object.assign(Object.assign({},defaultOptions),t),{context:o,selector:s="#t-dialog",actions:n}=e,c=__rest(e,["context","selector","actions"]),r=getInstance(o,s);if(!r)return Promise.reject();const{buttonLayout:a="vertical"}=t,i="vertical"===a?7:3;return(!n||"object"==typeof n&&(0===n.length||n.length>i))&&console.warn(`action 数量建议控制在1至${i}个`),new Promise((t=>{r.setData(Object.assign(Object.assign({actions:n},c),{buttonLayout:a,visible:!0})),r._onAction=t}))}};