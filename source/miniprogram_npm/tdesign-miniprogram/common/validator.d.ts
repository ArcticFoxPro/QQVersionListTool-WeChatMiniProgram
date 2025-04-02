export declare function isFunction(val: unknown): val is Function;
export declare const isString: (val: unknown) => val is string;
export declare const isNull: <T>(value: T) => value is null;
export declare const isUndefined: <T>(value: T) => value is undefined;
export declare function isDef(value: unknown): boolean;
export declare function isNumber(value: string): boolean;
export declare function isBoolean(value: unknown): value is boolean;
export declare function isObject(x: unknown): x is Record<string, unknown>;
export declare function isPlainObject(val: unknown): val is Record<string, unknown>;
