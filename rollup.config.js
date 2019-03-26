import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';


export default [
    // Browser-friendly UMD build
    {
        input: 'src/index.js',
        output: {
            name: 'isAprilFools',
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            babel(),
            terser(), //  so Rollup will minify
        ],
    },
    // ES module (for bundlers) build
    {
        input: 'src/index.js',
        external: ['ms'],
        output: [
            {
                file: pkg.main,
                format: 'cjs',
            },
            {
                file: pkg.module,
                format: 'es',
            },
        ],
    },
];
