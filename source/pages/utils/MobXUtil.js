import {action, observable} from 'mobx-miniprogram';

export const store = observable({
    licensesMp: {}, licensesBuild: {},

    setLicensesMp: action(function (licensesMp) {
        this.licensesMp = licensesMp;
    }),

    getLicensesMp: action(function () {
        return this.licensesMp;
    }),

    setLicensesBuild: action(function (licensesBuild) {
        this.licensesBuild = licensesBuild;
    }),

    getLicensesBuild: action(function () {
        return this.licensesBuild;
    })
});
