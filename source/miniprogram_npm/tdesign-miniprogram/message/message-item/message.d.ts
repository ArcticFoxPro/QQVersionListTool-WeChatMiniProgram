/// <reference types="miniprogram-api-typings" />
import { SuperComponent, ComponentsOptionsType } from '../../common/src/index';
import { MessageProps } from '../message.interface';
export default class Message extends SuperComponent {
    externalClasses: string[];
    options: ComponentsOptionsType;
    properties: MessageProps;
    data: {
        prefix: string;
        classPrefix: string;
        loop: number;
        animation: any[];
        showAnimation: any[];
        wrapTop: number;
        fadeClass: string;
    };
    observers: {
        marquee(val: any): void;
        'icon, theme'(icon: any, theme: any): void;
        link(v: any): void;
        closeBtn(v: any): void;
    };
    closeTimeoutContext: number;
    nextAnimationContext: number;
    resetAnimation: WechatMiniprogram.Animation;
    ready(): void;
    memoInitialData(): void;
    resetData(cb: () => void): void;
    detached(): void;
    checkAnimation(): void;
    clearMessageAnimation(): void;
    show(offsetHeight?: number): void;
    hide(): void;
    reset(): void;
    handleClose(): void;
    handleLinkClick(): void;
}
