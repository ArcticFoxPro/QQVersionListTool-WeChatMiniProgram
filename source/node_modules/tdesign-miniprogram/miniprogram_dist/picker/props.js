const props = {
    autoClose: {
        type: Boolean,
        value: true,
    },
    cancelBtn: {
        type: null,
        value: true,
    },
    confirmBtn: {
        type: null,
        value: true,
    },
    header: {
        type: Boolean,
        value: true,
    },
    keys: {
        type: Object,
    },
    popupProps: {
        type: Object,
        value: {},
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
        type: Array,
        value: null,
    },
    defaultValue: {
        type: Array,
    },
    visible: {
        type: Boolean,
        value: false,
    },
};
export default props;
