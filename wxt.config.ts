import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import { defineConfig, WxtViteConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  imports: false,
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["history", "storage"],
  },
  vite: () =>
    ({
      plugins: [vanillaExtractPlugin(), tsconfigPathsPlugin()],
      define: {
        "import.meta.vitest": "undefined",
      },
    }) as unknown as WxtViteConfig,
});
