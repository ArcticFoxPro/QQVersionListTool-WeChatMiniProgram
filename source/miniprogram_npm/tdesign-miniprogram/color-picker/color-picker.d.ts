import { SuperComponent } from '../common/src/index';
import type { Coordinate } from './type';
import { Color } from './utils';
export default class ColorPicker extends SuperComponent {
    properties: import("./type").TdColorPickerProps;
    observers: {
        format(): void;
        swatchColors(value: any): void;
        type(value: any): void;
    };
    color: Color;
    data: {
        prefix: string;
        classPrefix: string;
        panelRect: {
            width: number;
            height: number;
        };
        sliderRect: {
            width: number;
            left: number;
        };
        saturationInfo: {
            saturation: number;
            value: number;
        };
        saturationThumbStyle: {
            left: number;
            top: number;
        };
        sliderInfo: {
            value: number;
        };
        hueSliderStyle: {
            left: number;
        };
        alphaSliderStyle: {
            left: number;
        };
        innerValue: string;
        showPrimaryColorPreview: boolean;
        previewColor: string;
        formatList: any[];
        innerSwatchList: any;
        isMultiple: boolean;
    };
    lifetimes: {
        ready(): void;
    };
    methods: {
        clickSwatch(e: any): void;
        setCoreStyle(): void;
        emitColorChange(trigger: any): void;
        defaultEmptyColor(): string;
        updateColor(): void;
        getSaturationAndValueByCoordinate(coordinate: Coordinate): {
            saturation: number;
            value: number;
        };
        getSaturationThumbStyle({ saturation, value }: {
            saturation: any;
            value: any;
        }): {
            color: any;
            left: string;
            top: string;
        };
        getSliderThumbStyle({ value, maxValue }: {
            value: any;
            maxValue: any;
        }): {
            left: string;
            color: any;
        };
        onChangeSaturation({ saturation, value }: {
            saturation: any;
            value: any;
        }): void;
        formatValue(): any;
        onChangeSlider({ value, isAlpha }: {
            value: any;
            isAlpha: any;
        }): void;
        handleSaturationDrag(e: any): void;
        handleSliderDrag(e: any, isAlpha?: boolean): void;
        handleDiffDrag(e: any): void;
        onTouchStart(e: any): void;
        onTouchMove(e: any): void;
        onTouchEnd(e: any): void;
    };
}
