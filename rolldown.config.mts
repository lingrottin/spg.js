import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/spg.ts",
  output: [
    { file: "dist/spg.cjs", format: "cjs" },
    { file: "dist/spg.mjs", format: "esm" },
  ],
  plugins: [babel({ babelHelpers: "bundled" }), terser()],
  external: ["typescript"],
});
