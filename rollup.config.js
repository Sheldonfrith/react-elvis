import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "./lib/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": '"development"',
    }),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ["react", "react-dom"],
};
