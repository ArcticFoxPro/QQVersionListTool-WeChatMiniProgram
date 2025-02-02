import {action, observable} from 'mobx-miniprogram';

export const store = observable({
    licensesBuild: {},

    setLicensesBuild: action(function (licensesBuild) {
        this.licensesBuild = licensesBuild;
    }),

    getLicensesBuild: action(function () {
        return this.licensesBuild;
    })
});
