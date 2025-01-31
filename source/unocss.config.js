import {defineConfig, presetUno} from "unocss";

const remRE = /^-?[.\d]+rem$/

export default defineConfig({
    presets: [presetUno(),], theme: {
        preflightRoot: ["page,::before,::after"]
    }, postprocess(util) {
        util.entries.forEach((i) => {
            const value = i[1]
            if (value && typeof value === 'string' && remRE.test(value)) {
                const numericValue = parseFloat(value.slice(0, -3));
                i[1] = `${numericValue * 2 * 32}rpx`;
            }
        })
    }, rules: [[/^bg-(.*)$/, ([, c]) => ({'background-color': `#${c}`})],],
})