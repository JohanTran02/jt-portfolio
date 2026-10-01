import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import jsPlugins, { jsPluginSettings } from "ultracite/oxlint/js-plugins";
import next from "ultracite/oxlint/next";
import nextJsPlugins from "ultracite/oxlint/next/js-plugins";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react, next, jsPlugins, nextJsPlugins],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    "renovate.json",
    "src/components/ui/**",
    "src/rubiks-cube/**",
    "*.d.ts",
  ],
  jsPlugins: jsPlugins.jsPlugins ?? null,
  options: {
    typeAware: true,
    typeCheck: true,
  },
  rules: {
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
  },
  settings: jsPluginSettings,
});