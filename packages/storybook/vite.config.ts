import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
