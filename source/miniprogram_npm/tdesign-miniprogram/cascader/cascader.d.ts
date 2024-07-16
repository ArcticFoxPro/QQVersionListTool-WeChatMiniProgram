/// <reference types="miniprogram-api-typings" />
import { SuperComponent } from '../common/src/index';
import { TdCascaderProps } from './type';
export interface CascaderProps extends TdCascaderProps {
}
export default class Cascader extends SuperComponent {
    externalClasses: string[];
    options: WechatMiniprogram.Component.ComponentOptions;
    properties: TdCascaderProps<import("../common/common").TreeOptionData<string | number>>;
    controlledProps: {
        key: string;
        event: string;
    }[];
    data: {
        prefix: string;
        name: string;
        stepIndex: number;
        selectedIndexes: any[];
        selectedValue: any[];
        scrollTopList: any[];
        steps: any[];
    };
    observers: {
        visible(v: any): void;
        value(): void;
        options(): void;
        selectedIndexes(): void;
        stepIndex(): Promise<void>;
    };
    methods: {
        initWithValue(): void;
        getIndexesByValue(options: import("../common/common").TreeOptionData<string | number>[], value: any): any[];
        updateScrollTop(): void;
        hide(trigger: any): void;
        onVisibleChange(): void;
        onClose(): void;
        onStepClick(e: any): void;
        onTabChange(e: any): void;
        genItems(): {
            selectedValue: any[];
            steps: any[];
            items: {
                [x: string]: any;
            }[][];
        };
        handleSelect(e: any): void;
    };
}
