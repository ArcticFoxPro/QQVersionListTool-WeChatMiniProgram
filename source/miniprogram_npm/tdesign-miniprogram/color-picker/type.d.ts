export interface TdColorPickerProps {
    enableAlpha?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    format?: {
        type: StringConstructor;
        value?: 'RGB' | 'RGBA' | 'HSL' | 'HSLA' | 'HSB' | 'HSV' | 'HSVA' | 'HEX' | 'CMYK' | 'CSS';
    };
    swatchColors?: {
        type: ArrayConstructor;
        value?: Array<string> | null;
    };
    type?: {
        type: StringConstructor;
        value?: TypeEnum;
    };
    value?: {
        type: StringConstructor;
        value?: string;
    };
    defaultValue?: {
        type: StringConstructor;
        value?: string;
    };
}
export declare type TypeEnum = 'base' | 'multiple';
export interface Coordinate {
    x: number;
    y: number;
}
export declare type ColorPickerChangeTrigger = 'palette-saturation-brightness' | 'palette-saturation' | 'palette-brightness' | 'palette-hue-bar' | 'palette-alpha-bar' | 'preset';
