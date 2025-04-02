import{__decorate}from"tslib";import{SuperComponent,wxComponent}from"../common/src/index";import config from"../common/config";import props from"./props";import TCalendar from"../common/shared/calendar/index";import useCustomNavbar from"../mixins/using-custom-navbar";import{getPrevMonth,getPrevYear,getNextMonth,getNextYear}from"./utils";const{prefix:prefix}=config,name=`${prefix}-calendar`,defaultLocaleText={title:"请选择日期",weekdays:["日","一","二","三","四","五","六"],monthTitle:"{year} 年 {month}",months:["1 月","2 月","3 月","4 月","5 月","6 月","7 月","8 月","9 月","10 月","11 月","12 月"],confirm:"确认"};let Calendar=class extends SuperComponent{constructor(){super(...arguments),this.behaviors=[useCustomNavbar],this.externalClasses=[`${prefix}-class`],this.options={multipleSlots:!0},this.properties=props,this.data={prefix:prefix,classPrefix:name,months:[],scrollIntoView:"",innerConfirmBtn:{},realLocalText:{},currentMonth:{},actionButtons:{preYearBtnDisable:!1,prevMonthBtnDisable:!1,nextMonthBtnDisable:!1,nextYearBtnDisable:!1}},this.controlledProps=[{key:"value",event:"confirm"},{key:"value",event:"change"}],this.lifetimes={created(){this.base=new TCalendar(this.properties)},ready(){const t=Object.assign(Object.assign({},defaultLocaleText),this.properties.localeText);this.initialValue(),this.setData({days:this.base.getDays(t.weekdays),realLocalText:t}),this.calcMonths(),"none"!==this.data.switchMode&&this.calcCurrentMonth(),this.data.usePopup||this.scrollIntoView()}},this.observers={type(t){this.base.type=t},confirmBtn(t){"string"==typeof t?this.setData({innerConfirmBtn:"slot"===t?"slot":{content:t}}):"object"==typeof t&&this.setData({innerConfirmBtn:t})},"firstDayOfWeek,minDate,maxDate"(t,e,a){t&&(this.base.firstDayOfWeek=t),e&&(this.base.minDate=e),a&&(this.base.maxDate=a),this.calcMonths()},value(t){this.base.value=t,this.calcMonths()},visible(t){t&&(this.scrollIntoView(),this.base.value=this.data.value,this.calcMonths())},format(t){const{usePopup:e,visible:a}=this.data;this.base.format=t,e&&!a||this.calcMonths()}},this.methods={initialValue(){const{value:t,type:e,minDate:a}=this.data;if(!t){const t=new Date,n=a||new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime(),s="single"===e?n:[n];"range"===e&&(s[1]=n+864e5),this.setData({value:s}),this.base.value=s}},scrollIntoView(){const{value:t}=this.data;if(!t)return;const e=new Date(Array.isArray(t)?t[0]:t);e&&this.setData({scrollIntoView:`year_${e.getFullYear()}_month_${e.getMonth()}`})},getCurrentYearAndMonth(t){const e=new Date(t);return{year:e.getFullYear(),month:e.getMonth()}},updateActionButton(t){const e=this.getCurrentYearAndMonth(this.base.minDate),a=this.getCurrentYearAndMonth(this.base.maxDate),n=new Date(e.year,e.month,1).getTime(),s=new Date(a.year,a.month,1).getTime(),i=getPrevYear(t).getTime(),r=getPrevMonth(t).getTime(),o=getNextMonth(t).getTime(),h=getNextYear(t).getTime(),l=i<n||r<n,c=r<n,m=o>s||h>s,u=o>s;this.setData({actionButtons:{preYearBtnDisable:l,prevMonthBtnDisable:c,nextYearBtnDisable:m,nextMonthBtnDisable:u}})},calcCurrentMonth(t){const e=t||this.getCurrentDate(),{year:a,month:n}=this.getCurrentYearAndMonth(e),s=this.data.months.filter((t=>t.year===a&&t.month===n));this.updateActionButton(e),this.setData({currentMonth:s.length>0?s:[this.data.months[0]]})},calcMonths(){const t=this.base.getMonths();this.setData({months:t})},close(t){this.data.autoClose&&this.setData({visible:!1}),this.triggerEvent("close",{trigger:t})},onVisibleChange(){this.close("overlay")},handleClose(){this.close("close-btn")},handleSelect(t){const{date:e,year:a,month:n}=t.currentTarget.dataset;if("disabled"===e.type)return;const s=this.base.select({cellType:e.type,year:a,month:n,date:e.day}),i=this.toTime(s);if(this.calcMonths(),"none"!==this.data.switchMode){const t=this.getCurrentDate();this.calcCurrentMonth(t)}null==this.data.confirmBtn&&("single"!==this.data.type&&2!==s.length||(this.setData({visible:!1}),this._trigger("change",{value:i}))),this.triggerEvent("select",{value:i})},onTplButtonTap(){const t=this.base.getTrimValue(),e=this.toTime(t);this.close("confirm-btn"),this._trigger("confirm",{value:e})},toTime:t=>Array.isArray(t)?t.map((t=>t.getTime())):t.getTime(),onScroll(t){this.triggerEvent("scroll",t.detail)},getCurrentDate(){var t,e;let a=Array.isArray(this.base.value)?this.base.value[0]:this.base.value;if(this.data.currentMonth.length>0){const n=null===(t=this.data.currentMonth[0])||void 0===t?void 0:t.year,s=null===(e=this.data.currentMonth[0])||void 0===e?void 0:e.month;a=new Date(n,s,1).getTime()}return a},handleSwitchModeChange(t){const{type:e,disabled:a}=t.currentTarget.dataset;if(a)return;const n=this.getCurrentDate(),s={"pre-year":()=>getPrevYear(n),"pre-month":()=>getPrevMonth(n),"next-month":()=>getNextMonth(n),"next-year":()=>getNextYear(n)}[e]();if(!s)return;const{year:i,month:r}=this.getCurrentYearAndMonth(s);this.triggerEvent("panel-change",{year:i,month:r+1}),this.calcCurrentMonth(s)}}}};Calendar=__decorate([wxComponent()],Calendar);export default Calendar;