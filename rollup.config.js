// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "lib/index.ts",
  output: [
    // {
    //   file: pkg.main,
    //   name: "elvis",
    //   sourcemap: "inline",
    //   format: "iife",
    //   globals: {
    //     react: "React", // Ensure React is available as "React" global variable
    //   },
    // },
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
    // typescript({
    // tsconfig: "tsconfig.json",
    // sourceMap: true,
    // inlineSources: true,
    // }),
    peerDepsExternal(),

    resolve({
      browser: true,
      dedupe: ["react", "react-dom"],
    }),
    // babel({
    // babelHelpers: "bundled",
    // presets: ["@babel/preset-react", { runtime: "automatic" }],
    // extensions: [".js", ".jsx"],
    // }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    commonjs(),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ["react", "react-dom"], // Specify React and ReactDOM as external
};
//   });

// import typescript from "rollup-plugin-typescript2";
// import nodeResolve from "@rollup/plugin-node-resolve";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import commonjs from "@rollup/plugin-commonjs";
// import babel from "@rollup/plugin-babel";
// import replace from "@rollup/plugin-replace";

// import pkg from "./package.json" assert { type: "json" };

// export default {
//   input: "./lib/index.ts",
//   output: [
//     {
//       name: pkg.name,
//       file: pkg.main,
//       format: "umd",
//       exports: "named",
//       sourcemap: true,
//       strict: false,
//       globals: {
//         react: "React",
//         "react-dom": "ReactDOM",
//       },
//     },
//   ],
//   plugins: [
//     peerDepsExternal(),
//     nodeResolve({
//       extensions: [".js", ".jsx"],
//     }),
//     babel({
//       babelHelpers: "bundled",
//       presets: ["@babel/preset-react"],
//       extensions: [".js", ".jsx"],
//     }),
//     commonjs(),
//     replace({
//       preventAssignment: false,
//       "process.env.NODE_ENV": '"development"',
//     }),
//     typescript({ objectHashIgnoreUnknownHack: true }),
//   ],
//   external: ["react", "react-dom"],
// };
