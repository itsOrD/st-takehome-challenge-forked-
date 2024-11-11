/// <referenc types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";
import type { InlineConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig
}


export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setup.test.ts',
  }
} as VitestConfigExport);
