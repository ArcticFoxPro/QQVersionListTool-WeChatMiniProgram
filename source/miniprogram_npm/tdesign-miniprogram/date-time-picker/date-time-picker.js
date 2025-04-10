var _a,_b;import{__decorate}from"tslib";import dayjs from"dayjs";import localeData from"dayjs/plugin/localeData";import config from"../common/config";import{SuperComponent,wxComponent}from"../common/src/index";import props from"./props";import dayjsLocaleMap from"./locale/dayjs";dayjs.extend(localeData),dayjs.locale("zh-cn");const defaultLocale=(null===(_a=dayjsLocaleMap[dayjs.locale()])||void 0===_a?void 0:_a.key)||(null===(_b=dayjsLocaleMap.default)||void 0===_b?void 0:_b.key),{prefix:prefix}=config,name=`${prefix}-date-time-picker`;var ModeItem;!function(e){e.YEAR="year",e.MONTH="month",e.DATE="date",e.HOUR="hour",e.MINUTE="minute",e.SECOND="second"}(ModeItem||(ModeItem={}));const DATE_MODES=["year","month","date"],TIME_MODES=["hour","minute","second"],FULL_MODES=[...DATE_MODES,...TIME_MODES],DEFAULT_MIN_DATE=dayjs("2000-01-01 00:00:00"),DEFAULT_MAX_DATE=dayjs("2030-12-31 23:59:59");let DateTimePicker=class extends SuperComponent{constructor(){super(...arguments),this.properties=props,this.externalClasses=[`${prefix}-class`,`${prefix}-class-confirm`,`${prefix}-class-cancel`,`${prefix}-class-title`],this.options={multipleSlots:!0},this.observers={"start, end, value":function(){this.updateColumns()},customLocale(e){e&&dayjsLocaleMap[e].key&&this.setData({locale:dayjsLocaleMap[e].i18n,dayjsLocale:dayjsLocaleMap[e].key})},mode(e){const t=this.getFullModeArray(e);this.setData({fullModes:t}),this.updateColumns()}},this.date=null,this.data={prefix:prefix,classPrefix:name,columns:[],columnsValue:[],fullModes:[],locale:dayjsLocaleMap[defaultLocale].i18n,dayjsLocale:dayjsLocaleMap[defaultLocale].key},this.controlledProps=[{key:"value",event:"change"}],this.methods={updateColumns(){this.date=this.getParseDate();const{columns:e,columnsValue:t}=this.getValueCols();this.setData({columns:e,columnsValue:t})},getDaysOfWeekInMonth(e){const{locale:t,dayjsLocale:a}=this.data,o=e.startOf("month"),s=e.endOf("month"),n=[];for(let e=0;e<=s.diff(o,"days");e+=1){const s=o.add(e,"days").locale(a).format("ddd");n.push({value:`${e+1}`,label:`${e+1}${t.date||""} ${s}`})}return n},getParseDate(){const{value:e,defaultValue:t}=this.properties,a=this.getMinDate();let o=e||t;if(this.isTimeMode()){const e=dayjs(a).format("YYYY-MM-DD");o=dayjs(`${e} ${o}`)}const s=dayjs(o||a);return s.isValid()?s:a},getMinDate(){const{start:e}=this.properties;return e?dayjs(e):DEFAULT_MIN_DATE},getMaxDate(){const{end:e}=this.properties;return e?dayjs(e):DEFAULT_MAX_DATE},getDateRect(e="default"){const t=this[{min:"getMinDate",max:"getMaxDate",default:"getDate"}[e]]();return["year","month","date","hour","minute","second"].map((e=>{var a;return null===(a=t[e])||void 0===a?void 0:a.call(t)}))},getDate(){return this.clipDate((null==this?void 0:this.date)||DEFAULT_MIN_DATE)},clipDate(e){const t=this.getMinDate(),a=this.getMaxDate();return dayjs(Math.min(Math.max(t.valueOf(),e.valueOf()),a.valueOf()))},setYear(e,t){const a=e.date(),o=e.year(t).daysInMonth();return e.date(Math.min(a.valueOf(),o.valueOf())).year(t)},setMonth(e,t){const a=e.date(),o=e.month(t).daysInMonth();return e.date(Math.min(a.valueOf(),o.valueOf())).month(t)},getColumnOptions(){const{fullModes:e,filter:t}=this.data,a=[];return null==e||e.forEach((e=>{const o=this.getOptionByType(e);"function"==typeof t?a.push(t(e,o)):a.push(o)})),a},getOptionByType(e){var t;const{locale:a,steps:o,showWeek:s}=this.data,n=[],l=this.getOptionEdge("min",e),i=this.getOptionEdge("max",e),r=null!==(t=null==o?void 0:o[e])&&void 0!==t?t:1,u=dayjs().locale(this.data.dayjsLocale).localeData().monthsShort();if("date"===e&&s)return this.getDaysOfWeekInMonth(this.date);for(let t=l;t<=i;t+=r)n.push({value:`${t}`,label:"month"===e?u[t]:`${t+a[e]}`});return n},getYearOptions(e){const{locale:t}=this.data,{minDateYear:a,maxDateYear:o}=e,s=[];for(let e=a;e<=o;e+=1)s.push({value:`${e}`,label:`${e+t.year}`});return s},getOptionEdge(e,t){const a=this.getDateRect(),o=this.getDateRect(e),s={month:[0,11],date:[1,this.getDate().daysInMonth()],hour:[0,23],minute:[0,59],second:[0,59]},n=["year","month","date","hour","minute","second"];for(let l=0,i=a.length;l<i;l+=1){if(n[l]===t)return o[l];if(o[l]!==a[l])return s[t]["min"===e?0:1]}return s[t]["min"===e?0:1]},getMonthOptions(){const e=[],t=this.getOptionEdge("min","month"),a=this.getOptionEdge("max","month"),o=dayjs.monthsShort();for(let s=t;s<=a;s+=1)e.push({value:`${s}`,label:o[s]});return e},getDayOptions(){const{locale:e}=this.data,t=[],a=this.getOptionEdge("min","date"),o=this.getOptionEdge("max","date");for(let s=a;s<=o;s+=1)t.push({value:`${s}`,label:`${s+e.day}`});return t},getHourOptions(){const{locale:e}=this.data,t=[],a=this.getOptionEdge("min","hour"),o=this.getOptionEdge("max","hour");for(let s=a;s<=o;s+=1)t.push({value:`${s}`,label:`${s+e.hour}`});return t},getMinuteOptions(){const{locale:e}=this.data,t=[],a=this.getOptionEdge("min","minute"),o=this.getOptionEdge("max","minute");for(let s=a;s<=o;s+=1)t.push({value:`${s}`,label:`${s+e.minute}`});return t},getValueCols(){return{columns:this.getColumnOptions(),columnsValue:this.getColumnsValue()}},getColumnsValue(){const{fullModes:e}=this.data,t=this.getDate(),a=[];return null==e||e.forEach((e=>{a.push(`${t[e]()}`)})),a},getNewDate(e,t){let a=this.getDate();switch(t){case ModeItem.YEAR:a=this.setYear(a,e);break;case ModeItem.MONTH:a=this.setMonth(a,e);break;case ModeItem.DATE:a=a.date(e);break;case ModeItem.HOUR:a=a.hour(e);break;case ModeItem.MINUTE:a=a.minute(e);break;case ModeItem.SECOND:a=a.second(e)}return this.clipDate(a)},onColumnChange(e){const{value:t,column:a}=null==e?void 0:e.detail,{fullModes:o,format:s}=this.data,n=null==t?void 0:t[a],l=null==o?void 0:o[a],i=this.getNewDate(parseInt(n,10),l);this.date=i;const{columns:r,columnsValue:u}=this.getValueCols();this.setData({columns:r,columnsValue:u});const d=this.getDate(),c=s?d.format(s):d.valueOf();this.triggerEvent("pick",{value:c})},onConfirm(){const{format:e}=this.properties,t=this.getDate(),a=e?t.format(e):t.valueOf();this._trigger("change",{value:a}),this.triggerEvent("confirm",{value:a}),this.resetColumns()},onCancel(){this.resetColumns(),this.triggerEvent("cancel")},onVisibleChange(e){e.detail.visible||this.resetColumns()},onClose(e){const{trigger:t}=e.detail;this.triggerEvent("close",{trigger:t})},resetColumns(){const e=this.getParseDate();this.date=e;const{columns:t,columnsValue:a}=this.getValueCols();this.setData({columns:t,columnsValue:a})}}}getFullModeArray(e){if("string"==typeof e||e instanceof String)return this.getFullModeByModeString(e,FULL_MODES);if(Array.isArray(e)){if(1===(null==e?void 0:e.length))return this.getFullModeByModeString(e[0],FULL_MODES);if(2===(null==e?void 0:e.length)){return[...this.getFullModeByModeString(e[0],DATE_MODES),...this.getFullModeByModeString(e[1],TIME_MODES)]}}}getFullModeByModeString(e,t){if(!e)return[];const a=null==t?void 0:t.findIndex((t=>e===t));return null==t?void 0:t.slice(0,a+1)}isTimeMode(){const{fullModes:e}=this.data;return e[0]===ModeItem.HOUR}};DateTimePicker=__decorate([wxComponent()],DateTimePicker);export default DateTimePicker;