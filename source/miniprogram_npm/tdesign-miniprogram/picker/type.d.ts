import { ButtonProps } from '../button/index';
import { PopupProps } from '../popup/index';
import { KeysType } from '../common/common';
export interface TdPickerProps {
    autoClose?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    cancelBtn?: {
        type: null;
        value?: boolean | string | ButtonProps;
    };
    confirmBtn?: {
        type: null;
        value?: boolean | string | ButtonProps;
    };
    header?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    keys?: {
        type: ObjectConstructor;
        value?: KeysType;
    };
    popupProps?: {
        type: ObjectConstructor;
        value?: PopupProps;
    };
    title?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: ArrayConstructor;
        value?: Array<PickerValue>;
    };
    defaultValue?: {
        type: ArrayConstructor;
        value?: Array<PickerValue>;
    };
    visible?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export declare type PickerValue = string | number;
