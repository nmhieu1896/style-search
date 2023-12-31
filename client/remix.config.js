/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // serverModuleFormat: "cjs",
  serverModuleFormat: "esm",
  serverBuildPath: "build/index.js",
  postcss: true,
};
