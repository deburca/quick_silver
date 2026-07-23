/**
 * Wraps esbuild's JS API (instead of its CLI) so we can override module
 * resolution via a plugin. esbuild's CLI auto-detects the nearest ancestor
 * .pnp.cjs and treats the whole project as Yarn PnP-managed; this repo's
 * root .pnp.cjs belongs to an unrelated toolchain and doesn't know about
 * this theme's own npm-managed node_modules, so bare imports get rejected.
 * A plugin's onResolve hook runs before esbuild's internal resolver, so
 * resolving "motion" ourselves here sidesteps that misdetection entirely.
 */
import { build } from "esbuild";
import { createRequire } from "node:module";

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["./src/motion.js"],
  bundle: true,
  minify: true,
  format: "iife",
  outfile: "./build/motion.js",
  plugins: [
    {
      name: "resolve-bare-imports",
      setup(build) {
        // Bare specifiers only (skip relative/absolute paths, which esbuild
        // already resolves fine on its own).
        build.onResolve({ filter: /^[^./]/ }, (args) => ({
          path: createRequire(args.importer).resolve(args.path),
        }));
      },
    },
  ],
};

if (watch) {
  const ctx = await (await import("esbuild")).context(options);
  await ctx.watch();
} else {
  await build(options);
}
