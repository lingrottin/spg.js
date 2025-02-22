import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.ts",
  output: [
    { file: "dist/spg.cjs.js", format: "cjs" },
    { file: "dist/spg.esm.js", format: "esm" },
    { file: "dist/spg.umd.js", format: "umd", name: "SPG" },
  ],
  plugins: [],
  external: ["typescript"],
});
