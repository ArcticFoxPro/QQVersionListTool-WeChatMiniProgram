var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import { MessageType } from './message.interface';
import props from './props';
import { unitConvert } from '../common/utils';
const SHOW_DURATION = 400;
const { prefix } = config;
const name = `${prefix}-message`;
let index = 0;
const instances = [];
let gap = 12;
let Message = class Message extends SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            styleIsolation: 'apply-shared',
            multipleSlots: true,
        };
        this.properties = Object.assign({}, props);
        this.data = {
            prefix,
            classPrefix: name,
            messageList: [],
        };
        this.observers = {};
    }
    ready() {
        this.memoInitialData();
    }
    memoInitialData() {
        this.initialData = Object.assign(Object.assign({}, this.properties), this.data);
    }
    setMessage(msg, theme = MessageType.info) {
        let id = `${name}_${index}`;
        if (msg.single) {
            id = name;
        }
        gap = unitConvert(msg.gap || gap);
        const msgObj = Object.assign(Object.assign({}, msg), { theme,
            id,
            gap });
        const instanceIndex = instances.findIndex((x) => x.id === id);
        if (instanceIndex < 0) {
            this.addMessage(msgObj);
        }
        else {
            const instance = instances[instanceIndex];
            const offsetHeight = this.getOffsetHeight(instanceIndex);
            instance.resetData(() => {
                instance.setData(msgObj, instance.show.bind(instance, offsetHeight));
                instance.onHide = () => {
                    this.close(id);
                };
            });
        }
    }
    addMessage(msgObj) {
        const list = [...this.data.messageList, { id: msgObj.id }];
        this.setData({
            messageList: list,
        }, () => {
            const offsetHeight = this.getOffsetHeight();
            const instance = this.showMessageItem(msgObj, msgObj.id, offsetHeight);
            if (instances) {
                instances.push(instance);
                index += 1;
            }
        });
    }
    getOffsetHeight(index = -1) {
        let offsetHeight = 0;
        let len = index;
        if (len === -1 || len > instances.length) {
            len = instances.length;
        }
        for (let i = 0; i < len; i += 1) {
            const instance = instances[i];
            offsetHeight += instance.data.height + instance.data.gap;
        }
        return offsetHeight;
    }
    showMessageItem(options, id, offsetHeight) {
        const instance = this.selectComponent(`#${id}`);
        if (instance) {
            instance.resetData(() => {
                instance.setData(options, instance.show.bind(instance, offsetHeight));
                instance.onHide = () => {
                    this.close(id);
                };
            });
            return instance;
        }
        console.error('未找到组件,请确认 selector && context 是否正确');
    }
    close(id) {
        setTimeout(() => {
            this.removeMsg(id);
        }, SHOW_DURATION);
        this.removeInstance(id);
    }
    hide(id) {
        if (!id) {
            this.hideAll();
        }
        const instance = instances.find((x) => x.id === id);
        if (instance) {
            instance.hide();
        }
    }
    hideAll() {
        for (let i = 0; i < instances.length;) {
            const instance = instances[i];
            instance.hide();
        }
    }
    removeInstance(id) {
        const index = instances.findIndex((x) => x.id === id);
        if (index < 0)
            return;
        const instance = instances[index];
        const removedHeight = instance.data.height;
        instances.splice(index, 1);
        for (let i = index; i < instances.length; i += 1) {
            const instance = instances[i];
            instance.setData({
                wrapTop: instance.data.wrapTop - removedHeight - instance.data.gap,
            });
        }
    }
    removeMsg(id) {
        const msgIndex = this.data.messageList.findIndex((x) => x.id === id);
        if (msgIndex > -1) {
            this.data.messageList.splice(msgIndex, 1);
            this.setData({
                messageList: this.data.messageList,
            });
        }
    }
    handleClose() {
        this.triggerEvent('close-btn-click');
    }
    handleLinkClick() {
        this.triggerEvent('link-click');
    }
};
Message = __decorate([
    wxComponent()
], Message);
export default Message;
