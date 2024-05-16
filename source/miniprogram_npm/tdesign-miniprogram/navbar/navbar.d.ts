import { SuperComponent } from '../common/src/index';
export default class Navbar extends SuperComponent {
    externalClasses: string[];
    timer: any;
    options: {
        multipleSlots: boolean;
    };
    properties: import("./type").TdNavbarProps;
    observers: {
        visible(this: Navbar, visible: any): void;
        'title,titleMaxLength'(this: any): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        boxStyle: string;
        showTitle: string;
    };
    attached(): void;
    methods: {
        goBack(): void;
    };
}
