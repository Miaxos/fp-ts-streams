import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: [
      'src/**/*.ts',
      '!src/**/*.test.ts',
    ],
    plugins: [multiInput(), commonjs(), typescript(), terser()],
    external: [],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
      },
      {
        dir: 'esm',
        format: 'es',
      },
    ],
  },
];
