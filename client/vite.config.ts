import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import { join } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();
export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  // resolve: {
  //   alias: {
  //     "#": join(__dirname, "./"),
  //     "#comps": join(__dirname, "./app/comps"),
  //     "#ss": join(__dirname, "./styled-system"),
  //   },
  // },
});

// "~/*": ["./app/*"],
// "#comps/*": ["./app/comps/*"],
// "#ss/*": ["./styled-system/*"]
