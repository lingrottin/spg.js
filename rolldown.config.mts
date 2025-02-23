import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/sspg.ts",
  output: [
    { file: "dist/sspg.cjs", format: "cjs" },
    { file: "dist/sspg.mjs", format: "esm" },
  ],
  plugins: [babel({ babelHelpers: "bundled" }), terser()],
  external: ["typescript"],
});
