var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-picker-item`;
const ANIMATION_DURATION = 1000;
const INERTIA_TIME = 300;
const INERTIA_DISTANCE = 15;
const range = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
};
const momentum = (distance, duration) => {
    let nDistance = distance;
    const speed = Math.abs(nDistance / duration);
    nDistance = (speed / 0.005) * (nDistance < 0 ? -1 : 1);
    return nDistance;
};
let PickerItem = class PickerItem extends SuperComponent {
    constructor() {
        super(...arguments);
        this.relations = {
            '../picker/picker': {
                type: 'parent',
                linked(parent) {
                    if ('keys' in parent.data) {
                        const { keys } = parent.data;
                        this.setData({
                            labelAlias: (keys === null || keys === void 0 ? void 0 : keys.label) || 'label',
                            valueAlias: (keys === null || keys === void 0 ? void 0 : keys.value) || 'value',
                        });
                    }
                },
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.externalClasses = [`${prefix}-class`];
        this.properties = props;
        this.observers = {
            options() {
                this.update();
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            offset: 0,
            duration: 0,
            value: '',
            curIndex: 0,
            columnIndex: 0,
            labelAlias: 'label',
            valueAlias: 'value',
            formatOptions: props.options.value,
        };
        this.lifetimes = {
            created() {
                this.StartY = 0;
                this.StartOffset = 0;
                this.startTime = 0;
            },
        };
        this.methods = {
            onTouchStart(event) {
                this.StartY = event.touches[0].clientY;
                this.StartOffset = this.data.offset;
                this.startTime = Date.now();
                this.setData({
                    duration: 0,
                });
            },
            onTouchMove(event) {
                const { StartY, StartOffset } = this;
                const { pickItemHeight } = this.data;
                const deltaY = event.touches[0].clientY - StartY;
                const newOffset = range(StartOffset + deltaY, -(this.getCount() * pickItemHeight), 0);
                this.setData({
                    offset: newOffset,
                });
            },
            onTouchEnd(event) {
                const { offset, labelAlias, valueAlias, columnIndex, pickItemHeight, formatOptions } = this.data;
                const { startTime } = this;
                if (offset === this.StartOffset) {
                    return;
                }
                let distance = 0;
                const move = event.changedTouches[0].clientY - this.StartY;
                const moveTime = Date.now() - startTime;
                if (moveTime < INERTIA_TIME && Math.abs(move) > INERTIA_DISTANCE) {
                    distance = momentum(move, moveTime);
                }
                const newOffset = range(offset + distance, -this.getCount() * pickItemHeight, 0);
                const index = range(Math.round(-newOffset / pickItemHeight), 0, this.getCount() - 1);
                this.setData({
                    offset: -index * pickItemHeight,
                    duration: ANIMATION_DURATION,
                    curIndex: index,
                });
                if (index === this._selectedIndex) {
                    return;
                }
                this._selectedIndex = index;
                wx.nextTick(() => {
                    var _a, _b, _c;
                    this._selectedIndex = index;
                    this._selectedValue = (_a = formatOptions[index]) === null || _a === void 0 ? void 0 : _a[valueAlias];
                    this._selectedLabel = (_b = formatOptions[index]) === null || _b === void 0 ? void 0 : _b[labelAlias];
                    (_c = this.$parent) === null || _c === void 0 ? void 0 : _c.triggerColumnChange({
                        index,
                        column: columnIndex,
                    });
                });
            },
            formatOption(options, columnIndex, format) {
                if (typeof format !== 'function')
                    return options;
                return options.map((ele) => {
                    return format(ele, columnIndex);
                });
            },
            update() {
                var _a, _b, _c, _d;
                const { options, value, labelAlias, valueAlias, pickItemHeight, format, columnIndex } = this.data;
                const formatOptions = this.formatOption(options, columnIndex, format);
                const index = formatOptions.findIndex((item) => item[valueAlias] === value);
                const selectedIndex = index > 0 ? index : 0;
                this._selectedIndex = selectedIndex;
                this._selectedValue = (_a = formatOptions[selectedIndex]) === null || _a === void 0 ? void 0 : _a[valueAlias];
                this._selectedLabel = (_b = formatOptions[selectedIndex]) === null || _b === void 0 ? void 0 : _b[labelAlias];
                this.setData({
                    formatOptions,
                    offset: -selectedIndex * pickItemHeight,
                    curIndex: selectedIndex,
                });
                this._selectedIndex = selectedIndex;
                this._selectedValue = (_c = options[selectedIndex]) === null || _c === void 0 ? void 0 : _c[valueAlias];
                this._selectedLabel = (_d = options[selectedIndex]) === null || _d === void 0 ? void 0 : _d[labelAlias];
            },
            getCount() {
                var _a, _b;
                return (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.length;
            },
        };
    }
};
PickerItem = __decorate([
    wxComponent()
], PickerItem);
export default PickerItem;
