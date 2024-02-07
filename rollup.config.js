// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "lib/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        dedupe: ["react", "react-dom"],
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      commonjs(),
      typescript({ objectHashIgnoreUnknownHack: true }),
    ],
    external: ["react", "react-dom"], // Specify React and ReactDOM as external
  },
  {
    input: "lib/index.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts.default()],
  },
];
