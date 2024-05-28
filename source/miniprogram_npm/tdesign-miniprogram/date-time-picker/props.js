const props = {
    cancelBtn: {
        type: String,
        value: '',
    },
    confirmBtn: {
        type: String,
        value: '',
    },
    customLocale: {
        type: String,
        value: 'zh',
    },
    end: {
        type: null,
    },
    externalClasses: {
        type: Array,
    },
    format: {
        type: String,
        value: 'YYYY-MM-DD HH:mm:ss',
    },
    header: {
        type: Boolean,
        value: true,
    },
    mode: {
        type: null,
        value: 'date',
    },
    popupProps: {
        type: Object,
        value: {},
    },
    showWeek: {
        type: Boolean,
        value: false,
    },
    start: {
        type: null,
    },
    steps: {
        type: Object,
    },
    title: {
        type: String,
        value: '',
    },
    usePopup: {
        type: Boolean,
        value: true,
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
    visible: {
        type: Boolean,
        value: false,
    },
};
export default props;
