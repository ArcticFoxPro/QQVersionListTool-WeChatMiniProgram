import {defineConfig, presetUno} from "unocss";

const remRE = /^-?[.\d]+rem$/

export default defineConfig({
    postprocess(util) {
        util.entries.forEach((i) => {
            const value = i[1]
            if (value && typeof value === 'string' && remRE.test(value)) {
                const numericValue = parseFloat(value.slice(0, -3));
                i[1] = `${numericValue * 2 * 32}rpx`;
            }
        })
    }, presets: [presetUno(),], rules: [[/^bg-(.*)$/, ([, c]) => ({'background-color': `#${c}`})],], theme: {
        preflightRoot: ["page,::before,::after"]
    },
})