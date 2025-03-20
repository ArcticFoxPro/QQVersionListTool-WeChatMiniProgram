import { SuperComponent, RelationsOptions, ComponentsOptionsType } from '../common/src/index';
import { PickerItemOption } from './type';
export default class PickerItem extends SuperComponent {
    relations: RelationsOptions;
    options: ComponentsOptionsType;
    externalClasses: string[];
    properties: import("./type").TdPickerItemProps;
    observers: {
        options(this: PickerItem): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        offset: number;
        duration: number;
        value: string;
        curIndex: number;
        columnIndex: number;
        labelAlias: string;
        valueAlias: string;
        formatOptions: PickerItemOption[];
    };
    lifetimes: {
        created(): void;
    };
    methods: {
        onTouchStart(event: any): void;
        onTouchMove(event: any): void;
        onTouchEnd(event: any): void;
        formatOption(options: PickerItemOption[], columnIndex: number, format: any): any[];
        update(): void;
        getCount(): any;
    };
}
