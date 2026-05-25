import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/**/*.test.ts", "packages/**/*.test.tsx", "tests/**/*.test.ts"],
    environment: "happy-dom",
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/preview/src/index.tsx"],
    },
  },
});
