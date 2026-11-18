import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@tiketo/pkpass-preview": fileURLToPath(
        new URL("./packages/preview/src/index.tsx", import.meta.url),
      ),
    },
  },
  test: {
    include: ["packages/**/*.test.ts", "packages/**/*.test.tsx", "tests/**/*.test.ts"],
    environment: "happy-dom",
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/preview/src/font-profiles.ts"],
    },
  },
});
